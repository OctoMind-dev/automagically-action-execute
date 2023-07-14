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

const sha = github.context.sha
if (sha.length === 0) {
  core.setFailed('sha is set to an empty string')
}

const ref = github.context.ref
if (ref.length === 0) {
  core.setFailed('ref is set to an empty string')
}

const urlDefault = 'https://app.octomind.dev'
const urlOverride = core.getInput('automagicallyBaseUrl')
const automagicallyUrl = urlOverride.length === 0 ? urlDefault : urlOverride

const executeUrl = `${automagicallyUrl}/api/v1/execute`
const context = {
  issueNumber: github.context.issue.number,
  repo: github.context.repo.repo,
  owner: github.context.repo.owner,
  ref,
  sha
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
