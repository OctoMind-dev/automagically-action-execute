import fetch, {type BodyInit} from 'node-fetch'

export const fetchJson = async <T>({
  url,
  token,
  body,
  method
}: {
  url: string
  token: string
  body?: BodyInit
  method: string
}): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': token
    },
    body,
    method
  })

  if (!response.ok) {
    const contentType = response.headers.get('Content-Type')
    throw new Error(
      `response not ok ${response.status}, ${JSON.stringify(
        {
          body: contentType === 'application/json' ? await response.json() : {}
        },
        null,
        2
      )}`
    )
  }

  return (await response.json()) as T
}
