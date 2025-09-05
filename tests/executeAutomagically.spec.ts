import {executeAutomagically} from '../src/executeAutomagically'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {fetchJson} from '../src/fetchJson'
import core from '@actions/core'
import github from '@actions/github'

vi.mock('../src/fetchJson')
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
  beforeEach(() => {
    vi.mocked(core).getInput.mockReturnValue('some input')
    vi.mocked(core).getBooleanInput.mockReturnValue(false)

    vi.mocked(core.summary.addHeading).mockReturnThis()
    vi.mocked(core.summary.addLink).mockReturnThis()
    vi.mocked(core.summary.write).mockResolvedValue(core.summary)

    vi.mocked(core.getMultilineInput).mockReturnValue([])
  })

  it('includes environment name if defined', async () => {
    const environmentName = 'staging'
    vi.mocked(core).getInput.mockReturnValue(environmentName)

    await executeAutomagically()

    expect(fetchJson).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST'
      })
    )

    const sentBody = JSON.parse(
      vi.mocked(fetchJson).mock.calls[0][0].body as string
    )

    expect(sentBody).toEqual(
      expect.objectContaining({
        environmentName
      })
    )
    expect(core.getInput).toHaveBeenCalledWith('environmentName')
  })

  it('includes breakpoint name if defined', async () => {
    const breakpointName = 'MOBILE'
    vi.mocked(core).getInput.mockReturnValue(breakpointName)

    await executeAutomagically()

    expect(fetchJson).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST'
      })
    )

    const sentBody = JSON.parse(
      vi.mocked(fetchJson).mock.calls[0][0].body as string
    )

    expect(sentBody).toEqual(
      expect.objectContaining({
        breakpoint: breakpointName
      })
    )
    expect(core.getInput).toHaveBeenCalledWith('breakpoint')
  })

  it('includes browser name if defined', async () => {
    const browserName = 'FIREFOX'
    vi.mocked(core).getInput.mockReturnValue(browserName)

    await executeAutomagically()

    expect(fetchJson).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST'
      })
    )

    const sentBody = JSON.parse(
      vi.mocked(fetchJson).mock.calls[0][0].body as string
    )

    expect(sentBody).toEqual(
      expect.objectContaining({
        browser: browserName
      })
    )
    expect(core.getInput).toHaveBeenCalledWith('browser')
  })

  it('includes variablesToOverwrite name if defined and preserves colons in the values', async () => {
    const variablesToOverwrite = ['key1:value1', 'key2:value:2']
    vi.mocked(core).getMultilineInput.mockReturnValue(variablesToOverwrite)

    await executeAutomagically()

    expect(fetchJson).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST'
      })
    )

    const sentBody = JSON.parse(
      vi.mocked(fetchJson).mock.calls[0][0].body as string
    )

    expect(sentBody).toEqual(
      expect.objectContaining({
        variablesToOverwrite: {
          key1: ['value1'],
          key2: ['value:2']
        }
      })
    )
    expect(core.getMultilineInput).toHaveBeenCalledWith('variablesToOverwrite')
  })

  it("executes and DOESN'T wait if it's not blocking", async () => {
    await executeAutomagically()

    expect(fetchJson).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST'
      })
    )
    expect(fetchJson).toHaveBeenCalledTimes(1)
  })

  it('executes and waits until passing while blocking', async () => {
    vi.mocked(core).getBooleanInput.mockReturnValue(true)

    // execute
    vi.mocked(fetchJson).mockResolvedValueOnce({
      testReport: {
        status: 'WAITING'
      }
    })
    // poll 1
    vi.mocked(fetchJson).mockResolvedValueOnce({
      status: 'WAITING'
    })
    // poll 2
    vi.mocked(fetchJson).mockResolvedValueOnce({
      status: 'WAITING'
    })
    // poll 3
    vi.mocked(fetchJson).mockResolvedValueOnce({
      status: 'PASSED'
    })

    await executeAutomagically({pollingIntervalInMilliseconds: 1})

    expect(fetchJson).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST'
      })
    )
    expect(fetchJson).toHaveBeenCalledTimes(4)
  })

  it('sets to failed if a request throws', async () => {
    vi.mocked(fetchJson).mockRejectedValue(new Error('not successful'))

    await executeAutomagically()

    expect(core.setFailed).toHaveBeenCalled()
  })

  it('sets to failed if a polling request throws', async () => {
    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    vi.mocked(fetchJson).mockResolvedValueOnce({
      testReport: {
        status: 'WAITING'
      }
    })
    vi.mocked(fetchJson).mockRejectedValue(new Error('not successful'))

    await executeAutomagically({pollingIntervalInMilliseconds: 1})

    expect(core.setFailed).toHaveBeenCalled()
  })

  it('sets to failed if polling returns FAILED', async () => {
    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    vi.mocked(fetchJson).mockResolvedValueOnce({
      testReport: {
        status: 'WAITING'
      }
    })
    vi.mocked(fetchJson).mockResolvedValueOnce({
      status: 'FAILED'
    })

    await executeAutomagically({pollingIntervalInMilliseconds: 1})

    expect(core.setFailed).toHaveBeenCalled()
  })

  it('sets to failed if polling never stops', async () => {
    vi.mocked(core).getBooleanInput.mockReturnValue(true)
    // execute
    vi.mocked(fetchJson).mockResolvedValueOnce({
      testReport: {
        status: 'WAITING'
      }
    })
    vi.mocked(fetchJson).mockResolvedValue({
      status: 'WAITING'
    })

    await executeAutomagically({
      pollingIntervalInMilliseconds: 1,
      maximumPollingTimeInMilliseconds: 5
    })

    expect(core.setFailed).toHaveBeenCalled()
  })
})
