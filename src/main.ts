import core from '@actions/core'
import github from '@actions/github'
import {setTimeout} from 'node:timers'
import {fetchJson} from './fetchJson'

type TestReportStatus = 'PASSED' | 'WAITING' | 'FAILED'

interface TestReport {
  id: string
  testTargetId: string
  createdAt: string
  updatedAt: string
  executionUrl: string
  context: {
    ref?: string
    sha?: string
    repo: string
    owner: string
    source: string
    issueNumber?: number
  }
  status: TestReportStatus
}

interface ResponseType {
  testReportUrl: string
  testReport: TestReport
}

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

const issueNumber = github.context.issue.number
if (!issueNumber || issueNumber < 1) {
  core.warning(
    'issue.number variable (Pull Request ID) not available. ' +
      'Make sure you run this action in a workflow triggered by pull request ' +
      'if you expect a comment with the test results on your PR'
  )
}

const urlDefault = 'https://app.octomind.dev'
const urlOverride = core.getInput('automagicallyBaseUrl')
const automagicallyUrl = urlOverride.length === 0 ? urlDefault : urlOverride

const executeUrl = `${automagicallyUrl}/api/v2/execute`
const getTestReportUrl = (testReportId: string) =>
  `${automagicallyUrl}/api/v2/test-targets/${testTargetId}/test-reports/${testReportId}`
const context = {
  issueNumber,
  repo: github.context.repo.repo,
  owner: github.context.repo.owner,
  ref: github.context.ref,
  sha: github.context.sha
}

core.debug(JSON.stringify({executeUrl, context}, null, 2))

const sleep = (timeInMilliseconds: number): Promise<void> =>
  new Promise(r => setTimeout(r, timeInMilliseconds))

const TIME_BETWEEN_POLLS_MILLISECONDS = 5_000

try {
  const executeResponse = await fetchJson<ResponseType>({
    url: executeUrl,
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
    while (currentStatus !== 'PASSED') {
      const testReport = await fetchJson<TestReport>({
        method: 'GET',
        token,
        url: getTestReportUrl(executeResponse.testReport.id)
      })

      currentStatus = testReport.status

      await sleep(TIME_BETWEEN_POLLS_MILLISECONDS)
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
