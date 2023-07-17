import core from '@actions/core'
import github from '@actions/github'
import fetch from 'node-fetch'

const url = core.getInput('url')
if (url.length === 0) {
  core.setFailed('url is set to an empty string')
}

const token = core.getInput('token')
if (token.length === 0) {
  core.setFailed('token is set to an empty string')
}

const issueNumber = github.context.issue.number
if (!issueNumber || issueNumber < 1) {
  core.warning(
    'issue.number variable (Pull Request ID) not available. ' +
      'Make sure you run this task in a PR build validation pipeline ' +
      'if you expect a comment with the test results on your PR'
  )
}

const urlDefault = 'https://app.octomind.dev'
const urlOverride = core.getInput('automagicallyBaseUrl')
const automagicallyUrl = urlOverride.length === 0 ? urlDefault : urlOverride

const executeUrl = `${automagicallyUrl}/api/v1/execute`
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token,
      url,
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
