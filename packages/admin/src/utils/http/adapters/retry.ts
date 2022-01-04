export function retryAdapterEnhancer(adapter, options: any = {}) {
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
        const delay = new Promise<void>((resolve) => {
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
