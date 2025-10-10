// this import MUST be a namespace import, otherwise ncc doesn't think it needs to bundle this :)
// eslint-disable-next-line import/no-namespace
import * as core from '@actions/core'
// this import MUST be a namespace import, otherwise ncc doesn't think it needs to bundle this :)
// eslint-disable-next-line import/no-namespace
import * as github from '@actions/github'
import {setTimeout} from 'node:timers'
import {fetchJson} from './fetchJson'
import {ExecuteResponse, TestReport} from './types'

const TIME_BETWEEN_POLLS_MILLISECONDS = 5_000
const MAXIMUM_POLL_TIME_MILLISECONDS = 2 * 60 * 60 * 1000
const DEFAULT_URL = 'https://app.octomind.dev'

const sleep = (timeInMilliseconds: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, timeInMilliseconds))

const getExecuteUrl = (automagicallyUrl: string) =>
  `${automagicallyUrl}/api/apiKey/v3/execute`

const multilineMappingToObject = (
  input: string[]
): Record<string, string[]> => {
  const keySplitOff = input
    .filter(mapping => mapping.length > 0)
    .map(mapping => mapping.split(':'))
    // the api takes an array of values per key, so we just wrap the value in an array
    // then we join with ':' to make it a string again and preserve colons in the value
    .map(parts => [parts[0], [parts.slice(1).join(':')]])
  return Object.fromEntries(keySplitOff)
}

const getTestReportApiUrl = (
  automagicallyUrl: string,
  testTargetId: string,
  testReportId: string
) =>
  `${automagicallyUrl}/api/apiKey/v3/test-targets/${testTargetId}/test-reports/${testReportId}`

export const executeAutomagically = async ({
  pollingIntervalInMilliseconds = TIME_BETWEEN_POLLS_MILLISECONDS,
  maximumPollingTimeInMilliseconds = MAXIMUM_POLL_TIME_MILLISECONDS
}: {
  pollingIntervalInMilliseconds?: number
  maximumPollingTimeInMilliseconds?: number
} = {}): Promise<void> => {
  const urlOverride = core.getInput('automagicallyBaseUrl')
  const automagicallyUrl = urlOverride.length === 0 ? DEFAULT_URL : urlOverride

  const issueNumber = github.context.issue.number
  if (!issueNumber || issueNumber < 1) {
    core.warning(
      'issue.number variable (Pull Request ID) not available. ' +
        'Make sure you run this action in a workflow triggered by pull request ' +
        'if you expect a comment with the test results on your PR'
    )
  }

  const context = {
    issueNumber,
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    ref: github.context.ref,
    sha: github.context.sha
  }

  core.debug(
    JSON.stringify(
      {executeUrl: getExecuteUrl(automagicallyUrl), context},
      null,
      2
    )
  )

  const url = core.getInput('url')
  if (url.length === 0) {
    core.setFailed('url is set to an empty string')
  }

  const token = core.getInput('token')
  if (token.length === 0) {
    core.setFailed('token is set to an empty string')
  }

  const testTargetId = core.getInput('testTargetId')
  if (testTargetId.length === 0) {
    core.setFailed('testTargetId is set to an empty string')
  }

  const blocking = core.getBooleanInput('blocking')
  const environmentName = core.getInput('environmentName')
  const browser = core.getInput('browser')
  const breakpoint = core.getInput('breakpoint')
  const variablesToOverwrite = core.getMultilineInput('variablesToOverwrite')
  const variablesToOverwriteObject =
    multilineMappingToObject(variablesToOverwrite)
  const tags = core.getMultilineInput('tags')

  try {
    const executeResponse = await fetchJson<ExecuteResponse>({
      url: getExecuteUrl(automagicallyUrl),
      method: 'POST',
      token,
      body: JSON.stringify({
        url,
        testTargetId,
        environmentName,
        variablesToOverwrite: variablesToOverwriteObject,
        tags,
        browser,
        breakpoint,
        context: {
          source: 'github',
          ...context
        }
      })
    })

    const testReportUrl = executeResponse.testReportUrl
    core.setOutput('testReportUrl', executeResponse.testReportUrl)
    await core.summary
      .addHeading('🐙 Octomind')
      .addLink('View your Test Report', testReportUrl)
      .write()

    if (blocking) {
      let currentStatus = executeResponse.testReport.status
      const start = Date.now()
      let now = start

      while (
        currentStatus === 'WAITING' &&
        now - start < maximumPollingTimeInMilliseconds
      ) {
        const testReport = await fetchJson<TestReport>({
          method: 'GET',
          token,
          url: getTestReportApiUrl(
            automagicallyUrl,
            testTargetId,
            executeResponse.testReport.id
          )
        })
        currentStatus = testReport.status

        await sleep(pollingIntervalInMilliseconds)
        now = Date.now()
      }

      if (currentStatus !== 'PASSED') {
        core.setFailed(
          `some test results failed, check your test report at ${testReportUrl} to find out more.`
        )
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(
        `unable to execute automagically:  ${
          typeof error.message === 'object'
            ? JSON.stringify({
                error: error.message
              })
            : error.message
        }`
      )
    } else {
      core.setFailed('unknown Error')
    }
  }
}
