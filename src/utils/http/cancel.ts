import axios from 'axios'
import { generateReqKey } from './helper'

const pendingRequest = new Map()
export function addPendingRequest(config) {
  const requestKey = generateReqKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel)
      }
    })
}

export function removePendingRequest(config) {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey)
    cancel(requestKey)
    pendingRequest.delete(requestKey)
  }
}

export function removeAllPendingRequest() {
  pendingRequest.forEach((cancel) => {
    cancel()
  })
  pendingRequest.clear()
}
