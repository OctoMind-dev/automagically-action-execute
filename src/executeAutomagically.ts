// this import MUST be a namespace import, otherwise ncc doesn't think it needs to bundle this :)
// eslint-disable-next-line import/no-namespace
import * as core from '@actions/core'
// this import MUST be a namespace import, otherwise ncc doesn't think it needs to bundle this :)
// eslint-disable-next-line import/no-namespace
import * as github from '@actions/github'
import {setTimeout} from 'node:timers'
import {createClientFromUrlAndApiKey} from '@octomind/octomind/client'
import {push} from '@octomind/octomind/push'
import {TestReport} from './types'
import {existsSync, readdirSync} from 'node:fs'
import {join} from 'node:path'

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

export const pushIfYmlsExist = async ({
  sourceDir,
  client,
  testTargetId
}: {
  sourceDir: string
  client: ReturnType<typeof createClientFromUrlAndApiKey>
  testTargetId: string
}): Promise<{versionIds: string[]} | undefined> => {
  const directoryExists = existsSync(sourceDir)
  const hasYmls =
    directoryExists &&
    readdirSync(sourceDir).some(file => file.endsWith('.yaml'))

  if (hasYmls) {
    return push({
      sourceDir,
      client,
      testTargetId,
      // https://docs.github.com/en/actions/reference/workflows-and-actions/variables
      branchName: process.env.GITHUB_HEAD_REF
        ? `refs/heads/${process.env.GITHUB_HEAD_REF}`
        : undefined,
      onError: error => {
        if (error) {
          core.setFailed(
            `error occurred when trying to push local ymls ${error}`
          )
          process.exit(1)
        }
      }
    })
  }

  return undefined
}

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
  const ymlSourceDirectory = core.getInput('ymlDirectory')
  const ymlDirectoryWithFallback =
    ymlSourceDirectory.length > 0
      ? ymlSourceDirectory
      : join(process.cwd(), '.octomind')

  const urlWithApiPostfix = new URL(automagicallyUrl)
  urlWithApiPostfix.pathname += '/api'

  const client = createClientFromUrlAndApiKey({
    baseUrl: urlWithApiPostfix.href,
    apiKey: token
  })

  try {
    const pushed = await pushIfYmlsExist({
      client,
      testTargetId,
      sourceDir: ymlDirectoryWithFallback
    })

    const executeResponse = await client.POST('/apiKey/v3/execute', {
      body: {
        url,
        testTargetId,
        environmentName,
        variablesToOverwrite: variablesToOverwriteObject,
        tags,
        browser: browser as 'SAFARI' | 'CHROMIUM' | 'FIREFOX',
        breakpoint: breakpoint as 'DESKTOP' | 'TABLET' | 'MOBILE',
        context: {
          source: 'github',
          ...context
        },
        testCaseVersionIds: pushed?.versionIds
      }
    })

    if (
      !executeResponse.data?.testReportUrl ||
      !executeResponse.data?.testReport ||
      !executeResponse.data.testReport.id
    ) {
      core.setFailed('execute did not return any data')
      throw new Error('execute did not return any data')
    }

    const testReportUrl = executeResponse.data.testReportUrl

    core.setOutput('testReportUrl', testReportUrl)
    await core.summary
      .addHeading('🐙 Octomind')
      .addLink('View your Test Report', testReportUrl)
      .write()

    if (blocking) {
      let currentStatus: TestReport['status'] | undefined =
        executeResponse.data.testReport.status
      const start = Date.now()
      let now = start

      while (
        currentStatus === 'WAITING' &&
        now - start < maximumPollingTimeInMilliseconds
      ) {
        const testReport = await client.GET(
          '/apiKey/v3/test-targets/{testTargetId}/test-reports/{testReportId}',
          {
            params: {
              path: {
                testTargetId,
                testReportId: executeResponse.data.testReport.id
              }
            }
          }
        )
        currentStatus = testReport.data?.status

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
