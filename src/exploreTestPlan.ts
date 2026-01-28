import {info, setFailed, summary} from '@actions/core'
import {createClientFromUrlAndApiKey} from '@octomind/octomind/client'
import {GitHubContext} from './utils'

export const exploreTestPlan = async ({
  client,
  testTargetId,
  url,
  environmentName,
  context
}: {
  client: ReturnType<typeof createClientFromUrlAndApiKey>
  testTargetId: string
  url: string
  environmentName: string
  context: GitHubContext
}): Promise<void> => {
  info('Test plan exploration triggered')
  info(`Test target ID: ${testTargetId}`)

  const exploreResponse = await client.POST(
    '/apiKey/v3/test-targets/{testTargetId}/test-plan/explore' as any,
    {
      params: {
        path: {
          testTargetId
        }
      },
      body: {
        url,
        environmentName,
        context: {
          source: 'github',
          ...context
        }
      }
    }
  )

  if (!exploreResponse.data) {
    setFailed('test plan exploration did not return any data')
    throw new Error('test plan exploration did not return any data')
  }

  info('Test plan exploration completed successfully')

  await summary
    .addHeading('🐙 Octomind - Test Plan Exploration')
    .addRaw('Test plan exploration completed successfully')
    .write()
}
