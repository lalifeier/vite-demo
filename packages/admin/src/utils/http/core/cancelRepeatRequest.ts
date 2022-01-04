import type { Canceler } from 'axios'
import axios from 'axios'
import { generateReqKey } from '../utils'

const pendingRequest = new Map<string, Canceler>()

export class AxiosCanceler {
  addPending(config) {
    const requestKey = generateReqKey(config)

    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        pendingRequest.set(requestKey, cancel)
      })
  }

  removePending(config) {
    const requestKey = generateReqKey(config)
    if (pendingRequest.has(requestKey)) {
      console.log(`${config.url} 请求已取消`)

      const cancel = pendingRequest.get(requestKey)
      cancel && cancel(requestKey)
      pendingRequest.delete(requestKey)
    }
  }

  removeAllPending() {
    pendingRequest.forEach((cancel) => {
      cancel()
    })
    pendingRequest.clear()
  }
}
