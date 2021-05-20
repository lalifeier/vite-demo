import { WebStorage } from './storage'

export const DEFAULT_EXPIRE_TIME = 60 * 60 * 24 * 7
export const DEFAULT_PREFIX_KEY = 'admin_pro_'

const createOption = (storage: Storage, option) => {
  return {
    storage,
    prefixKey: DEFAULT_PREFIX_KEY,
    timeout: DEFAULT_EXPIRE_TIME,
    ...option,
  }
}

export const createSessionStorage = (opt) => {
  return new WebStorage(createOption(sessionStorage, opt))
}

export const createLocalStorage = (opt) => {
  return new WebStorage(createOption(localStorage, opt))
}
