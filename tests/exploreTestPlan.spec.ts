import core from '@actions/core'
import {createClientFromUrlAndApiKey} from '@octomind/octomind/client'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {type DeepMockProxy, mockDeep} from 'vitest-mock-extended'
import {exploreTestPlan} from '../src/exploreTestPlan'
import type {GitHubContext} from '../src/utils'

vi.mock('@octomind/octomind/client')
vi.mock('@actions/core')

describe(exploreTestPlan.name, () => {
  let mockedClient: DeepMockProxy<
    ReturnType<typeof createClientFromUrlAndApiKey>
  >
  let mockContext: GitHubContext

  beforeEach(() => {
    vi.mocked(core.summary.addHeading).mockReturnThis()
    vi.mocked(core.summary.addRaw).mockReturnThis()
    vi.mocked(core.summary.write).mockResolvedValue(core.summary)

    mockedClient = mockDeep()
    vi.mocked(createClientFromUrlAndApiKey).mockReturnValue(mockedClient)
    vi.mocked(mockedClient.POST).mockResolvedValue({
      data: {success: true}
    } as never)

    mockContext = {
      issueNumber: 10,
      repo: 'some repo',
      owner: 'some owner',
      ref: 'refs/heads/main',
      sha: 'abc123'
    }
  })

  it('calls explore API with correct parameters', async () => {
    const params = {
      client: mockedClient,
      testTargetId: 'test-target-id',
      url: 'https://example.com',
      environmentName: 'staging',
      context: mockContext
    }

    await exploreTestPlan(params)

    expect(mockedClient.POST).toHaveBeenCalledWith(
      '/apiKey/v3/test-plan/explore',
      {
        body: {
          testTargetId: params.testTargetId,
          url: params.url,
          environmentName: params.environmentName,
          context: {
            source: 'github',
            ...mockContext
          }
        }
      }
    )
  })

  it('logs exploration trigger information', async () => {
    await exploreTestPlan({
      client: mockedClient,
      testTargetId: 'test-target-id',
      url: 'https://example.com',
      environmentName: 'default',
      context: mockContext
    })

    expect(core.info).toHaveBeenCalledWith('Test plan exploration triggered')
    expect(core.info).toHaveBeenCalledWith('Test target ID: test-target-id')
  })

  it('creates summary on successful exploration', async () => {
    await exploreTestPlan({
      client: mockedClient,
      testTargetId: 'test-target-id',
      url: 'https://example.com',
      environmentName: 'default',
      context: mockContext
    })

    expect(core.summary.addHeading).toHaveBeenCalledWith(
      '🐙 Octomind - Test Plan Exploration'
    )
    expect(core.summary.addRaw).toHaveBeenCalledWith(
      'Test plan exploration completed successfully'
    )
    expect(core.summary.write).toHaveBeenCalled()
  })

  it('throws error when API returns no data', async () => {
    vi.mocked(mockedClient.POST).mockResolvedValueOnce({
      data: undefined
    } as never)

    await expect(
      exploreTestPlan({
        client: mockedClient,
        testTargetId: 'test-target-id',
        url: 'https://example.com',
        environmentName: 'default',
        context: mockContext
      })
    ).rejects.toThrow('test plan exploration did not return any data')

    expect(core.setFailed).toHaveBeenCalledWith(
      'test plan exploration did not return any data'
    )
  })

  it('logs success message after completion', async () => {
    await exploreTestPlan({
      client: mockedClient,
      testTargetId: 'test-target-id',
      url: 'https://example.com',
      environmentName: 'default',
      context: mockContext
    })

    expect(core.info).toHaveBeenCalledWith(
      'Test plan exploration completed successfully'
    )
  })
})
