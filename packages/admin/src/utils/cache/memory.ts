export class Memory {
  private data: any
  private timeout: number

  constructor(timeout = 0) {
    this.data = {}
    this.timeout = timeout
  }

  set(key: string, value: any, expire = 0) {
    expire = expire || this.timeout
    this.data[key] = {
      value,
      time: new Date().getTime(),
      expire,
    }
  }

  get(key: string, def: any = null) {
    const val = this.data[key]
    if (!val) {
      return def
    }

    const { value, time, expire } = val
    const isExpired = expire && new Date().getTime() - time > expire
    isExpired && this.remove(key)

    return isExpired ? def : value
  }

  remove(key: string) {
    delete this.data[key]
  }

  clear() {
    this.data = {}
  }
}

export const memory = new Memory()
