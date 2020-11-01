import request from 'utils/request'

export const getQueryString = params =>
  Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&')

const baseURL = 'http://localhost:4040'
const baseRoute = '/api'
const commonRequest = path => `${baseURL}${baseRoute}${path}`

export const api = {
  postPage: body => {
    const requestURL = commonRequest('/sites')
    return request(requestURL, {
      body: JSON.stringify(body),
      method: 'POST',
    })
  },
  getPages: () => {
    const requestURL = commonRequest('/sites')
    return request(requestURL)
  },
  getPage: ({ pathParams }) => {
    const { pageId } = pathParams
    const requestURL = commonRequest(`/sites/${pageId}`)
    return request(requestURL)
  },
  getStats: ({ pathParams, queryParams }) => {
    const { pageId } = pathParams
    const qs = getQueryString(queryParams)
    const requestURL = commonRequest(`/sites/${pageId}/metrics/stats?${qs}`)
    return request(requestURL)
  },
}
