import core from '@actions/core'
import github from '@actions/github'
import {setTimeout} from 'node:timers'
import {fetchJson} from './fetchJson'
import {ExecuteResponse, TestReport} from './types'

const TIME_BETWEEN_POLLS_MILLISECONDS = 5_000
const DEFAULT_URL = 'https://app.octomind.dev'

const sleep = (timeInMilliseconds: number): Promise<void> =>
  new Promise(r => setTimeout(r, timeInMilliseconds))

const getExecuteUrl = (automagicallyUrl: string) =>
  `${automagicallyUrl}/api/v2/execute`

const getTestReportApiUrl = (
  automagicallyUrl: string,
  testTargetId: string,
  testReportId: string
) =>
  `${automagicallyUrl}/api/v2/test-targets/${testTargetId}/test-reports/${testReportId}`

export const main = async (
  pollingIntervalInMilliseconds: number = TIME_BETWEEN_POLLS_MILLISECONDS
): Promise<void> => {
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

  try {
    const executeResponse = await fetchJson<ExecuteResponse>({
      url: getExecuteUrl(automagicallyUrl),
      method: 'POST',
      token,
      body: JSON.stringify({
        url,
        testTargetId,
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
      while (currentStatus === 'WAITING') {
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
      }

      if (currentStatus === 'FAILED') {
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
