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

const urlDefault = 'https://automagically-5vr3ysri3a-ey.a.run.app'
const urlOverride = core.getInput('automagically-url')
const automagicallyURL = urlOverride.length === 0 ? urlDefault : urlOverride

try {
  const response = await fetch(`${automagicallyURL}/api/v1/execute`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token,
      url,
      context: {
        source: 'github',
        issueNumber: github.context.issue.number,
        repo: github.context.repo.repo,
        owner: github.context.repo.owner
      }
    }),
    method: 'POST'
  })

  if (!response.ok) {
    throw new Error(
      `response not ok ${response.status}, body: ${await response.json()}`
    )
  }
} catch (error) {
  if (error instanceof Error) {
    core.setFailed(
      `unable to execute automagically: ${JSON.stringify({
        error: error.message
      })}`
    )
  } else {
    core.setFailed('unknown Error')
  }
}
