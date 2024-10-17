import {main} from '@/main'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {fetchJson} from '@/fetchJson'
import core from '@actions/core'
import github from '@actions/github'

vi.mock('@/fetchJson')
vi.mock('@actions/core')
vi.mock('@actions/github')

describe(main.name, () => {
  beforeEach(() => {
    vi.mocked(fetchJson).mockResolvedValue({
      testReportUrl: 'https://someUrl.com'
    })
    vi.mocked(core).getInput.mockReturnValue('some input')
    vi.mocked(core).getBooleanInput.mockReturnValue(false)
    vi.mocked(github).context = {
      issue: {
        number: 10
      },
      repo: {
        repo: 'some repo',
        owner: 'some owner'
      }
    } as typeof github.context

    vi.mocked(core.summary.addHeading).mockReturnThis()
    vi.mocked(core.summary.addLink).mockReturnThis()
    vi.mocked(core.summary.write).mockResolvedValue(core.summary)
  })

  it("executes and DOESN'T wait if it's not blocking", async () => {
    await main()

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

    await main(1)

    expect(fetchJson).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST'
      })
    )
    expect(fetchJson).toHaveBeenCalledTimes(4)
  })

  it('sets to failed if a request throws', async () => {
    vi.mocked(fetchJson).mockRejectedValue(new Error('not successful'))

    await main()

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

    await main()

    expect(core.setFailed).toHaveBeenCalled()
  })
})
