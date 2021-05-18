// import axios from 'axios'

// axios.defaults.retryTimes = 4
// axios.defaults.retryDelay = 1000

export function retryInterceptor(axios, err) {
  const { config } = err
  if (!config || !config.retryTimes) return Promise.reject(err)
  const { __retryCount = 0, retryDelay = 300, retryTimes } = config

  config.__retryCount = __retryCount
  if (__retryCount >= retryTimes) {
    return Promise.reject(err)
  }
  config.__retryCount++
  const delay = new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, retryDelay)
  })
  return delay.then(function () {
    return axios(config)
  })
}

export function retryAdapterEnhancer(adapter, options = {}) {
  const { times = 0, delay = 300 } = options
  return async (config) => {
    const { retryTimes = times, retryDelay = delay } = config
    let __retryCount = 0
    const request = async () => {
      try {
        return await adapter(config)
      } catch (err) {
        if (!retryTimes || __retryCount >= retryTimes) {
          return Promise.reject(err)
        }
        __retryCount++
        const delay = new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, retryDelay)
        })
        return delay.then(() => {
          return request()
        })
      }
    }
    return request()
  }
}
