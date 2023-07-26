import core from '@actions/core'
import github from '@actions/github'
import fetch from 'node-fetch'

interface ResponseType {
  testReport: {
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
  }
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
const context = {
  issueNumber,
  repo: github.context.repo.repo,
  owner: github.context.repo.owner,
  ref: github.context.ref,
  sha: github.context.sha
}

core.debug(JSON.stringify({executeUrl, context}, null, 2))

try {
  const response = await fetch(executeUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      url,
      testTargetId,
      context: {
        source: 'github',
        ...context
      }
    }),
    method: 'POST'
  })

  if (!response.ok) {
    const contentType = response.headers.get('Content-Type')
    throw new Error(
      `response not ok ${response.status}, ${JSON.stringify(
        {
          body: contentType === 'application/json' ? await response.json() : {}
        },
        null,
        2
      )}`
    )
  }

  const jsonResponse = (await response.json()) as ResponseType
  if (jsonResponse) {
    const testReportId = jsonResponse.testReport.id
    const testReportUrl = `${automagicallyUrl}/testreports/${testReportId}`
    core.setOutput('testReportUrl', testReportUrl)
    await core.summary
      .addHeading('🐙 Octomind')
      .addLink('View your Test Report', testReportUrl)
      .write()
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
