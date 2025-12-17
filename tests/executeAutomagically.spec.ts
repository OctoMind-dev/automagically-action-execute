import {executeAutomagically} from '../src/executeAutomagically'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import core from '@actions/core'
import github from '@actions/github'
import {createClientFromUrlAndApiKey} from '@octomind/octomind/client'
import {DeepMockProxy, mock, mockDeep} from 'vitest-mock-extended'
import {
  createMockExecuteResponse,
  createMockTestReport,
  createMockTestReportResponse
} from './mocks'
import {push} from '@octomind/octomind/push'
import {join} from 'node:path'
import fs from 'node:fs'

vi.mock('fs')
vi.mock('@octomind/octomind/client')
vi.mock('@octomind/octomind/push')
vi.mock('@actions/core')
vi.mock('@actions/github', () => ({
  default: vi.fn(),
  context: {
    issue: {
      number: 10
    },
    repo: {
      repo: 'some repo',
      owner: 'some owner'
    }
  } as typeof github.context
}))

describe(executeAutomagically.name, () => {
  let mockedClient: DeepMockProxy<
    ReturnType<typeof createClientFromUrlAndApiKey>
  >

  beforeEach(() => {
    vi.mocked(core).getInput.mockReturnValue('some input')
    vi.mocked(core).getBooleanInput.mockReturnValue(false)

    vi.mocked(core.summary.addHeading).mockReturnThis()
    vi.mocked(core.summary.addLink).mockReturnThis()
    vi.mocked(core.summary.write).mockResolvedValue(core.summary)

    vi.mocked(core.getMultilineInput).mockReturnValue([])
    mockedClient = mockDeep()
    vi.mocked(createClientFromUrlAndApiKey).mockReturnValue(mockedClient)
    vi.mocked(mockedClient.POST).mockResolvedValue(mock())
    vi.mocked(mockedClient.GET).mockResolvedValue(mock())

    vi.mocked(core).getInput.mockImplementation(() => '')
    vi.mocked(fs).existsSync.mockReturnValue(false)
    process.env.GITHUB_HEAD_REF = ''
  })

  it('includes environment name if defined', async () => {
    const environmentName = 'staging'

    vi.mocked(core).getInput.mockImplementation(name => {
      if (name === 'environmentName') {
        return environmentName
      }
      return ''
    })

    await executeAutomagically()

    expect(mockedClient.POST).toHaveBeenCalledWith('/apiKey/v3/execute', {
      body: expect.objectContaining({
        environmentName
      })
    })

    expect(core.getInput).toHaveBeenCalledWith('environmentName')
  })

  it('includes breakpoint name if defined', async () => {
    const breakpointName = 'MOBILE'
    vi.mocked(core).getInput.mockImplementation(name => {
      if (name === 'breakpoint') {
        return breakpointName
      }
      return ''
    })

    await executeAutomagically()

    expect(mockedClient.POST).toHaveBeenCalledWith('/apiKey/v3/execute', {
      body: expect.objectContaining({
        breakpoint: breakpointName
      })
    })

    expect(core.getInput).toHaveBeenCalledWith('breakpoint')
  })

  it('includes browser name if defined', async () => {
    const browserName = 'FIREFOX'
    vi.mocked(core).getInput.mockImplementation(name => {
      if (name === 'browser') {
        return browserName
      }
      return ''
    })

    await executeAutomagically()

    expect(mockedClient.POST).toHaveBeenCalledWith('/apiKey/v3/execute', {
      body: expect.objectContaining({
        browser: browserName
      })
    })

    expect(core.getInput).toHaveBeenCalledWith('browser')
  })

  it('includes variablesToOverwrite name if defined and preserves colons in the values', async () => {
    const variablesToOverwrite = ['key1:value1', 'key2:value:2']
    vi.mocked(core).getMultilineInput.mockReturnValue(variablesToOverwrite)

    await executeAutomagically()

    expect(mockedClient.POST).toHaveBeenCalledWith('/apiKey/v3/execute', {
      body: expect.objectContaining({
        variablesToOverwrite: {
          key1: ['value1'],
          key2: ['value:2']
        }
      })
    })

    expect(core.getMultilineInput).toHaveBeenCalledWith('variablesToOverwrite')
  })

  it("executes and DOESN'T wait if it's not blocking", async () => {
    await executeAutomagically()

    expect(mockedClient.POST).toHaveBeenCalledWith(
      '/apiKey/v3/execute',
      expect.anything()
    )
    expect(mockedClient.GET).not.toHaveBeenCalled()
  })

  it('executes and waits until passing while blocking', async () => {
    vi.mocked(core).getBooleanInput.mockReturnValue(true)

    // execute
    vi.mocked(mockedClient.POST).mockResolvedValueOnce(
      createMockExecuteResponse({testReport: {status: 'WAITING'}}) as never
    )
    // poll 1
    vi.mocked(mockedClient.GET).mockResolvedValueOnce(
      createMockTestReportResponse({status: 'WAITING'}) as never
    )
    // poll 2
    vi.mocked(mockedClient.GET).mockResolvedValueOnce(
      createMockTestReportResponse({status: 'WAITING'}) as never
    )
    // poll 3
    vi.mocked(mockedClient.GET).mockResolvedValueOnce(
      createMockTestReportResponse({status: 'PASSED'}) as never
    )

    await executeAutomagically({pollingIntervalInMilliseconds: 1})

    expect(mockedClient.POST).toHaveBeenCalledTimes(1)
    expect(mockedClient.GET).toHaveBeenCalledTimes(3)
  })

  it('sets to failed if a request throws', async () => {
    vi.mocked(mockedClient.POST).mockRejectedValue(new Error('not successful'))

    await executeAutomagically()

    expect(core.setFailed).toHaveBeenCalled()
  })

  it('sets to failed if a polling request throws', async () => {
    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    vi.mocked(mockedClient.POST).mockResolvedValueOnce(
      createMockExecuteResponse({
        testReport: createMockTestReport({status: 'WAITING'})
      }) as never
    )
    vi.mocked(mockedClient.GET).mockRejectedValue(new Error('not successful'))
    await executeAutomagically({pollingIntervalInMilliseconds: 1})

    expect(core.setFailed).toHaveBeenCalled()
  })

  it('sets to failed if polling returns FAILED', async () => {
    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    vi.mocked(mockedClient.POST).mockResolvedValueOnce(
      createMockExecuteResponse({
        testReport: createMockTestReport({status: 'WAITING'})
      }) as never
    )
    vi.mocked(mockedClient.GET).mockResolvedValueOnce(
      createMockTestReportResponse({status: 'FAILED'})
    )

    await executeAutomagically({pollingIntervalInMilliseconds: 1})

    expect(core.setFailed).toHaveBeenCalled()
  })

  it('sets to failed if polling never stops', async () => {
    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    vi.mocked(mockedClient.POST).mockResolvedValueOnce(
      createMockExecuteResponse({testReport: {status: 'WAITING'}}) as never
    )
    vi.mocked(mockedClient.GET).mockResolvedValue(
      createMockTestReportResponse({status: 'WAITING'})
    )

    await executeAutomagically({
      pollingIntervalInMilliseconds: 1,
      maximumPollingTimeInMilliseconds: 5
    })

    expect(core.setFailed).toHaveBeenCalled()
  })

  it('pushes if yml files exist', async () => {
    vi.mocked(fs).existsSync.mockReturnValue(true)
    // @ts-expect-error overloaded method
    vi.mocked(fs).readdirSync.mockReturnValue(['a.yaml'])

    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    vi.mocked(mockedClient.POST).mockResolvedValueOnce(
      createMockExecuteResponse({testReport: {status: 'WAITING'}}) as never
    )

    vi.mocked(mockedClient.GET).mockResolvedValue(
      createMockTestReportResponse({status: 'PASSED'})
    )

    await executeAutomagically({
      pollingIntervalInMilliseconds: 1,
      maximumPollingTimeInMilliseconds: 5
    })

    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({
        sourceDir: join(process.cwd(), '.octomind'),
        branchName: undefined
      })
    )
  })

  it('pushes with branch name if env variable is defined', async () => {
    vi.mocked(fs).existsSync.mockReturnValue(true)
    // @ts-expect-error overloaded method
    vi.mocked(fs).readdirSync.mockReturnValue(['a.yaml'])

    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    vi.mocked(mockedClient.POST).mockResolvedValueOnce(
      createMockExecuteResponse({testReport: {status: 'WAITING'}}) as never
    )

    vi.mocked(mockedClient.GET).mockResolvedValue(
      createMockTestReportResponse({status: 'PASSED'})
    )
    process.env.GITHUB_HEAD_REF = 'some-branch'

    await executeAutomagically({
      pollingIntervalInMilliseconds: 1,
      maximumPollingTimeInMilliseconds: 5
    })

    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({
        sourceDir: join(process.cwd(), '.octomind'),
        branchName: `refs/heads/${process.env.GITHUB_HEAD_REF}`
      })
    )
  })

  it('pushes different source directory if yml files exist and config provided', async () => {
    vi.mocked(fs).existsSync.mockReturnValue(true)
    // @ts-expect-error overloaded method
    vi.mocked(fs).readdirSync.mockReturnValue(['a.yaml'])

    const mockedDirectory = '/some/other/directory'
    vi.mocked(core).getInput.mockImplementation(name => {
      if (name === 'ymlDirectory') {
        return mockedDirectory
      }
      return ''
    })

    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    vi.mocked(mockedClient.POST).mockResolvedValueOnce(
      createMockExecuteResponse({testReport: {status: 'WAITING'}}) as never
    )

    vi.mocked(mockedClient.GET).mockResolvedValue(
      createMockTestReportResponse({status: 'PASSED'})
    )

    await executeAutomagically({
      pollingIntervalInMilliseconds: 1,
      maximumPollingTimeInMilliseconds: 5
    })

    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({
        sourceDir: mockedDirectory
      })
    )
  })
})
