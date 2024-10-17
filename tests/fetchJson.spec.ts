import {fetchJson} from '../src/fetchJson'
import fetch, {type Response} from 'node-fetch'
import {beforeEach, describe, expect, it, vi} from 'vitest'

vi.mock('node-fetch')

describe(fetchJson.name, () => {
  beforeEach(() => {
    vi.mocked(fetch).mockResolvedValue({
      json(): Promise<unknown> {
        return Promise.resolve(undefined)
      },
      ok: true
    } as unknown as Response)
  })

  it('should provide the token as header', async () => {
    const token = 'someToken'
    const url = 'https://url.com'
    await fetchJson({
      method: 'GET',
      token,
      url
    })

    expect(fetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        headers: expect.objectContaining({
          'x-api-key': token
        })
      })
    )
  })

  it('should throw an error if the response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      json(): Promise<unknown> {
        return Promise.resolve(undefined)
      },
      ok: false
    } as unknown as Response)

    const token = 'someToken'
    const url = 'https://url.com'

    await expect(
      fetchJson({
        method: 'GET',
        token,
        url
      })
    ).rejects.toBeTruthy()
  })

  it('should return the json-parsed response', async () => {
    const jsonResponse = {
      something: 'to respond with'
    } as const
    vi.mocked(fetch).mockResolvedValue({
      json(): Promise<typeof jsonResponse> {
        return Promise.resolve(jsonResponse)
      },
      ok: true
    } as unknown as Response)

    const token = 'someToken'
    const url = 'https://url.com'

    const response = await fetchJson({
      method: 'GET',
      token,
      url
    })

    expect(response).toEqual(jsonResponse)
  })
})
