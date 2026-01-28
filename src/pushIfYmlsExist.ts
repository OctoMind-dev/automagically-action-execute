// this import MUST be a namespace import, otherwise ncc doesn't think it needs to bundle this :)

import {existsSync, readdirSync} from 'node:fs'
import {setFailed} from '@actions/core'
import type {createClientFromUrlAndApiKey} from '@octomind/octomind/client'
import {push} from '@octomind/octomind/push'

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
      branchName: process.env.GITHUB_HEAD_REF
        ? `refs/heads/${process.env.GITHUB_HEAD_REF}`
        : undefined,
      onError: error => {
        if (error) {
          setFailed(`error occurred when trying to push local ymls ${error}`)
          process.exit(1)
        }
      }
    })
  }

  return undefined
}
