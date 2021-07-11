import { createWebStorage, WebStorageOption } from './storage'

export const DEFAULT_EXPIRE_TIME = 60 * 60 * 24 * 7
export const DEFAULT_PREFIX_KEY = 'admin_pro_'

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

export const session = createSessionStorage()
export const local = createLocalStorage()
