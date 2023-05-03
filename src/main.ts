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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token, url}),
      method: 'POST'
    }
  )

  if (!response.ok) {
    throw new Error(await response.text())
  }
} catch (error) {
  if (error instanceof Error) {
    core.setFailed(`unable to execute automagically: ${error.message}`)
  } else {
    core.setFailed('unknown Error')
  }
}
