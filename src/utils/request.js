function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null
  }
  return response.json()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

const commonOptions = {
  headers: { 'content-type': 'application/json' },
}

export default async function request(url, options = {}) {
  const newOptions = { ...commonOptions, ...options }
  const fetchResponse = await fetch(url, newOptions)
  const response = await checkStatus(fetchResponse)
  return parseJSON(response)
}
