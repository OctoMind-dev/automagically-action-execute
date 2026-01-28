import core from '@actions/core'
import type github from '@actions/github'
import {createClientFromUrlAndApiKey} from '@octomind/octomind/client'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {type DeepMockProxy, mockDeep} from 'vitest-mock-extended'
import {executeAutomagically} from '../src/executeAutomagically'
import {executeTests} from '../src/executeTests'
import {exploreTestPlan} from '../src/exploreTestPlan'

vi.mock('@octomind/octomind/client')
vi.mock('@actions/core')
vi.mock('../src/executeTests')
vi.mock('../src/exploreTestPlan')
vi.mock('@actions/github', () => ({
  default: vi.fn(),
  context: {
    issue: {
      number: 10
    },
    repo: {
      repo: 'some repo',
      owner: 'some owner'
    },
    ref: 'refs/heads/main',
    sha: 'abc123'
  } as typeof github.context
}))

describe(executeAutomagically.name, () => {
  let mockedClient: DeepMockProxy<
    ReturnType<typeof createClientFromUrlAndApiKey>
  >

  beforeEach(() => {
    vi.clearAllMocks()

    mockedClient = mockDeep()
    vi.mocked(createClientFromUrlAndApiKey).mockReturnValue(mockedClient)

    vi.mocked(core.getInput).mockImplementation((name: string) => {
      if (name === 'token') return 'test-token'
      if (name === 'testTargetId') return 'test-target-id'
      if (name === 'url') return 'https://example.com'
      if (name === 'environmentName') return 'default'
      if (name === 'browser') return 'CHROMIUM'
      if (name === 'breakpoint') return 'DESKTOP'
      return ''
    })

    vi.mocked(core.getBooleanInput).mockReturnValue(false)
    vi.mocked(core.getMultilineInput).mockReturnValue([])
    vi.mocked(executeTests).mockResolvedValue(undefined)
    vi.mocked(exploreTestPlan).mockResolvedValue(undefined)
  })

  describe('action dispatching', () => {
    it('dispatches to executeTests when action is "execute-tests"', async () => {
      vi.mocked(core.getInput).mockImplementation((name: string) => {
        if (name === 'action') return 'execute-tests'
        if (name === 'token') return 'test-token'
        if (name === 'testTargetId') return 'test-target-id'
        if (name === 'url') return 'https://example.com'
        if (name === 'environmentName') return 'default'
        if (name === 'browser') return 'CHROMIUM'
        if (name === 'breakpoint') return 'DESKTOP'
        return ''
      })

      await executeAutomagically()

      expect(executeTests).toHaveBeenCalledWith(
        expect.objectContaining({
          client: mockedClient,
          testTargetId: 'test-target-id',
          url: 'https://example.com',
          environmentName: 'default'
        })
      )
      expect(exploreTestPlan).not.toHaveBeenCalled()
    })

    it('dispatches to executeTests when action is empty (backwards compatibility)', async () => {
      await executeAutomagically()

      expect(executeTests).toHaveBeenCalled()
      expect(exploreTestPlan).not.toHaveBeenCalled()
    })

    it('dispatches to exploreTestPlan when action is "explore-test-plan"', async () => {
      vi.mocked(core.getInput).mockImplementation((name: string) => {
        if (name === 'action') return 'explore-test-plan'
        if (name === 'token') return 'test-token'
        if (name === 'testTargetId') return 'test-target-id'
        if (name === 'url') return 'https://example.com'
        if (name === 'environmentName') return 'staging'
        return ''
      })

      await executeAutomagically()

      expect(exploreTestPlan).toHaveBeenCalledWith({
        client: mockedClient,
        testTargetId: 'test-target-id',
        url: 'https://example.com',
        environmentName: 'staging',
        context: {
          issueNumber: 10,
          repo: 'some repo',
          owner: 'some owner',
          ref: 'refs/heads/main',
          sha: 'abc123'
        }
      })
      expect(executeTests).not.toHaveBeenCalled()
    })
  })

  describe('input validation', () => {
    it('fails when token is empty', async () => {
      vi.mocked(core.getInput).mockImplementation((name: string) => {
        if (name === 'token') return ''
        if (name === 'testTargetId') return 'test-target-id'
        return ''
      })

      await expect(executeAutomagically()).rejects.toThrow(
        'token is set to an empty string'
      )

      expect(core.setFailed).toHaveBeenCalledWith(
        'token is set to an empty string'
      )
    })

    it('fails when testTargetId is empty', async () => {
      vi.mocked(core.getInput).mockImplementation((name: string) => {
        if (name === 'token') return 'test-token'
        if (name === 'url') return 'https://example.com'
        if (name === 'testTargetId') return ''
        return ''
      })

      await expect(executeAutomagically()).rejects.toThrow(
        'testTargetId is set to an empty string'
      )

      expect(core.setFailed).toHaveBeenCalledWith(
        'testTargetId is set to an empty string'
      )
    })

    it('fails when url is empty for execute-tests action', async () => {
      vi.mocked(core.getInput).mockImplementation((name: string) => {
        if (name === 'token') return 'test-token'
        if (name === 'testTargetId') return 'test-target-id'
        if (name === 'url') return ''
        return ''
      })

      await expect(executeAutomagically()).rejects.toThrow(
        'url is set to an empty string'
      )

      expect(core.setFailed).toHaveBeenCalledWith(
        'url is set to an empty string'
      )
    })

    it('fails when url is empty for explore-test-plan action', async () => {
      vi.mocked(core.getInput).mockImplementation((name: string) => {
        if (name === 'action') return 'explore-test-plan'
        if (name === 'token') return 'test-token'
        if (name === 'testTargetId') return 'test-target-id'
        if (name === 'url') return ''
        return ''
      })

      await expect(executeAutomagically()).rejects.toThrow(
        'url is set to an empty string'
      )

      expect(core.setFailed).toHaveBeenCalledWith(
        'url is set to an empty string'
      )
    })
  })

  describe('error handling', () => {
    it('handles errors from executeTests', async () => {
      const error = new Error('Test execution failed')
      vi.mocked(executeTests).mockRejectedValueOnce(error)

      await executeAutomagically()

      expect(core.setFailed).toHaveBeenCalledWith(
        expect.stringContaining('unable to execute automagically')
      )
    })

    it('handles errors from exploreTestPlan', async () => {
      vi.mocked(core.getInput).mockImplementation((name: string) => {
        if (name === 'action') return 'explore-test-plan'
        if (name === 'token') return 'test-token'
        if (name === 'testTargetId') return 'test-target-id'
        if (name === 'url') return 'https://example.com'
        return ''
      })

      const error = new Error('Exploration failed')
      vi.mocked(exploreTestPlan).mockRejectedValueOnce(error)

      await executeAutomagically()

      expect(core.setFailed).toHaveBeenCalledWith(
        expect.stringContaining('unable to execute automagically')
      )
    })
  })

  describe('client creation', () => {
    it('creates client with correct base URL and API key', async () => {
      await executeAutomagically()

      expect(createClientFromUrlAndApiKey).toHaveBeenCalledWith({
        baseUrl: 'https://app.octomind.dev/api',
        apiKey: 'test-token'
      })
    })

    it('uses custom base URL when provided', async () => {
      vi.mocked(core.getInput).mockImplementation((name: string) => {
        if (name === 'automagicallyBaseUrl') return 'https://custom.url'
        if (name === 'token') return 'test-token'
        if (name === 'testTargetId') return 'test-target-id'
        if (name === 'url') return 'https://example.com'
        return ''
      })

      await executeAutomagically()

      expect(createClientFromUrlAndApiKey).toHaveBeenCalledWith({
        baseUrl: 'https://custom.url/api',
        apiKey: 'test-token'
      })
    })
  })

  describe('context building', () => {
    it('builds GitHub context correctly', async () => {
      await executeAutomagically()

      expect(executeTests).toHaveBeenCalledWith(
        expect.objectContaining({
          context: {
            issueNumber: 10,
            repo: 'some repo',
            owner: 'some owner',
            ref: 'refs/heads/main',
            sha: 'abc123'
          }
        })
      )
    })
  })
})
