import LRUCache from 'lru-cache'
import { generateReqKey } from './helper'

// const MemoryCache = {
//   data: {},
//   set (key, value, maxAge) {
//     this.data[key] = {
//       maxAge: maxAge || 0,
//       value,
//       now: Date.now()
//     }
//   },
//   get (key) {
//     const cachedItem = this.data[key]
//     if (!cachedItem) return null
//     const isExpired = Date.now() - cachedItem.now > cachedItem.maxAge
//     isExpired && this.delete(key)
//     return isExpired ? null : cachedItem.value
//   },
//   del (key) {
//     return delete this.data[key]
//   },
//   clear () {
//     this.data = {}
//   }
// }

function isCacheLike(cache) {
  return !!(
    (
      cache.set &&
      cache.get &&
      cache.del &&
      // cache.clear &&
      typeof cache.get === 'function' &&
      typeof cache.set === 'function' &&
      typeof cache.del === 'function'
    )
    // typeof cache.clear === 'function'
  )
}

const FIVE_MINUTES = 1000 * 60 * 5
const CAPACITY = 100

export function cacheAdapterEnhancer(adapter, options) {
  const {
    maxAge,
    enabledByDefault = true,
    cacheFlag = 'cache',
    // defaultCache = MemoryCache
    defaultCache = new LRUCache({ maxAge: FIVE_MINUTES, max: CAPACITY }),
  } = options
  return (config) => {
    const { method, forceUpdate } = config
    const useCache =
      config[cacheFlag] !== undefined && config[cacheFlag] !== null ? config[cacheFlag] : enabledByDefault
    if (method === 'get' && useCache) {
      const cache = isCacheLike(useCache) ? useCache : defaultCache
      const requestKey = generateReqKey(config)
      let responsePromise = cache.get(requestKey)
      if (!responsePromise || forceUpdate) {
        responsePromise = (async () => {
          try {
            return await adapter(config)
          } catch (error) {
            cache.del(requestKey)
            throw error
          }
        })()
        cache.set(requestKey, responsePromise, maxAge)
        return responsePromise
      }
      return responsePromise
    }

    return adapter(config)
  }
}
