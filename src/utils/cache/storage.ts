export interface StorageOption {
  storage: Storage
  prefixKey: string
  timeout: number
}

export class WebStorage {
  private storage: Storage
  private prefixKey: string
  private timeout: number

  constructor(opt?: StorageOption) {
    const { storage = sessionStorage, prefixKey = '', timeout = 0 } = opt || {}
    this.storage = storage
    this.prefixKey = prefixKey
    this.timeout = timeout
  }

  generateKey(key: string) {
    return `${this.prefixKey}${key}`
  }

  set(key: string, value: any, expire = 0) {
    expire = expire || this.timeout
    const data = JSON.stringify({
      value,
      time: new Date().getTime(),
      expire,
    })
    this.storage.setItem(this.generateKey(key), data)
  }

  get(key: string, def: any = null) {
    const val = this.storage.getItem(this.generateKey(key))
    if (!val) {
      return def
    }

    try {
      const data = JSON.parse(val)
      const { value, time, expire } = data

      const isExpired = expire && new Date().getTime() - time > expire
      isExpired && this.remove(key)

      return isExpired ? def : value
    } catch (error) {
      return def
    }
  }

  remove(key: string) {
    this.storage.removeItem(this.generateKey(key))
  }

  clear() {
    this.storage.clear()
  }
}
