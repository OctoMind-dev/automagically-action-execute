import core from '@actions/core'
import fetch from 'node-fetch'

const url = core.getInput('url')
if (url.length === 0) {
  core.setFailed('url is set to an empty string')
}

const token = core.getInput('token')
if (token.length === 0) {
  core.setFailed('token is set to an empty string')
}

try {
  const response = await fetch(
    'https://automagically-5vr3ysri3a-ey.a.run.app/api/v1/execute',
    {
      body: JSON.stringify({token, url}),
      method: 'POST'
    }
  )

  core.setOutput('result', await response.json())
} catch (error) {
  if (error instanceof Error) {
    core.setFailed(error.message)
  } else {
    core.setFailed('unknown Error')
  }
}
