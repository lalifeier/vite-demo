import axios from 'axios'

let isRefreshing = false
let requests: Array<Function> = []

export function refreshTokenRequest(config) {
  if (!isRefreshing) {
    isRefreshing = true

    try {
      config.headers.Authorization = ''
      config.baseURL = ''
      requests.forEach((cb: Function) => cb(''))
      requests = []
      isRefreshing = false
      return axios(config)
    } catch (error) {
      isRefreshing = false
      return Promise.reject(new Error(error.message))
    }
  }
  return new Promise((resolve) => {
    requests.push((token) => {
      config.baseURL = ''
      config.headers.Authorization = token
      resolve(axios(config))
    })
  })
}
