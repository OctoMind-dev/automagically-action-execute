import {setFailed, setOutput, summary} from '@actions/core'
import {createClientFromUrlAndApiKey} from '@octomind/octomind/client'
import {TestReport} from './types'
import {
  sleep,
  TIME_BETWEEN_POLLS_MILLISECONDS,
  MAXIMUM_POLL_TIME_MILLISECONDS,
  GitHubContext
} from './utils'
import {pushIfYmlsExist} from './pushIfYmlsExist'

export const executeTests = async ({
  client,
  testTargetId,
  url,
  environmentName,
  browser,
  breakpoint,
  variablesToOverwriteObject,
  tags,
  ymlDirectoryWithFallback,
  context,
  blocking,
  pollingIntervalInMilliseconds = TIME_BETWEEN_POLLS_MILLISECONDS,
  maximumPollingTimeInMilliseconds = MAXIMUM_POLL_TIME_MILLISECONDS
}: {
  client: ReturnType<typeof createClientFromUrlAndApiKey>
  testTargetId: string
  url: string
  environmentName: string
  browser: string
  breakpoint: string
  variablesToOverwriteObject: Record<string, string[]>
  tags: string[]
  ymlDirectoryWithFallback: string
  context: GitHubContext
  blocking: boolean
  pollingIntervalInMilliseconds?: number
  maximumPollingTimeInMilliseconds?: number
}): Promise<void> => {
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
    setFailed('execute did not return any data')
    throw new Error('execute did not return any data')
  }

  const testReportUrl = executeResponse.data.testReportUrl

  setOutput('testReportUrl', testReportUrl)
  await summary
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
      setFailed(
        `some test results failed, check your test report at ${testReportUrl} to find out more.`
      )
    }
  }
}
