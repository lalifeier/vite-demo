import { DEFAULT_EXPIRE_TIME, DEFAULT_PREFIX_KEY } from '@/settings/cache'
import { createWebStorage, WebStorageOption } from './storage'

export type Options = Partial<WebStorageOption>

const createOptions = (storage: Storage, option: Options = {}): WebStorageOption => {
  return {
    storage,
    prefixKey: DEFAULT_PREFIX_KEY,
    timeout: DEFAULT_EXPIRE_TIME,
    ...option
  }
}

export const createSessionStorage = (opt: Options = {}) => {
  return createWebStorage(createOptions(sessionStorage, opt))
}

export const createLocalStorage = (opt: Options = {}) => {
  return createWebStorage(createOptions(localStorage, opt))
}

export const _sessionStorage = createSessionStorage()
export const _localStorage = createLocalStorage()

export const clearWebStorage = () => {
  _localStorage.clear()
  _sessionStorage.clear()
}
