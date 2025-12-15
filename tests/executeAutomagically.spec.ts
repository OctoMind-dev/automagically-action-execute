import {executeAutomagically} from '../src/executeAutomagically'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import core from '@actions/core'
import github from '@actions/github'
import {createClientFromUrlAndApiKey} from '@octomind/octomind/client'
import {DeepMockProxy, mockDeep} from 'vitest-mock-extended'
import {
  createMockExecuteResponse,
  createMockTestReport,
  createMockTestReportResponse
} from './mocks'

vi.mock('@octomind/octomind/client')
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
    mockedClient.POST.mockResolvedValue({data: {}})
    mockedClient.GET.mockResolvedValue({data: {}})
  })

  it('includes environment name if defined', async () => {
    const environmentName = 'staging'
    vi.mocked(core).getInput.mockReturnValue(environmentName)

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
    vi.mocked(core).getInput.mockReturnValue(breakpointName)

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
    vi.mocked(core).getInput.mockReturnValue(browserName)

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
    mockedClient.POST.mockResolvedValueOnce(
      createMockExecuteResponse({
        testReport: createMockTestReport({status: 'WAITING'})
      })
    )
    // poll 1
    mockedClient.GET.mockResolvedValueOnce(
      createMockExecuteResponse({status: 'WAITING'})
    )
    // poll 2
    mockedClient.GET.mockResolvedValueOnce(
      createMockTestReportResponse({status: 'WAITING'})
    )
    // poll 3
    mockedClient.GET.mockResolvedValueOnce(
      createMockTestReportResponse({status: 'PASSED'})
    )

    await executeAutomagically({pollingIntervalInMilliseconds: 1})

    expect(mockedClient.POST).toHaveBeenCalledTimes(1)
    expect(mockedClient.GET).toHaveBeenCalledTimes(3)
  })

  it('sets to failed if a request throws', async () => {
    mockedClient.POST.mockRejectedValue(new Error('not successful'))

    await executeAutomagically()

    expect(core.setFailed).toHaveBeenCalled()
  })

  it('sets to failed if a polling request throws', async () => {
    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    mockedClient.POST.mockResolvedValueOnce(
      createMockExecuteResponse({
        testReport: createMockTestReport({status: 'WAITING'})
      })
    )
    mockedClient.GET.mockRejectedValue(new Error('not successful'))
    await executeAutomagically({pollingIntervalInMilliseconds: 1})

    expect(core.setFailed).toHaveBeenCalled()
  })

  it('sets to failed if polling returns FAILED', async () => {
    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    mockedClient.POST.mockResolvedValueOnce(
      createMockExecuteResponse({
        testReport: createMockTestReport({status: 'WAITING'})
      })
    )
    mockedClient.GET.mockResolvedValueOnce(
      createMockTestReportResponse({status: 'FAILED'})
    )

    await executeAutomagically({pollingIntervalInMilliseconds: 1})

    expect(core.setFailed).toHaveBeenCalled()
  })

  it('sets to failed if polling never stops', async () => {
    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    mockedClient.POST.mockResolvedValueOnce(
      createMockExecuteResponse({
        testReport: createMockTestReport({status: 'WAITING'})
      })
    )
    mockedClient.GET.mockResolvedValue(
      createMockTestReportResponse({status: 'WAITING'})
    )

    await executeAutomagically({
      pollingIntervalInMilliseconds: 1,
      maximumPollingTimeInMilliseconds: 5
    })

    expect(core.setFailed).toHaveBeenCalled()
  })
})
