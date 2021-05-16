import CryptoJS from 'crypto-js'

interface Option {
  iv?: any
  mode?: any
  padding?: any
}

export default class AES {
  private key
  private option

  constructor(
    key: string,
    opt: Option = {
      iv: '',
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  ) {
    this.key = CryptoJS.enc.Utf8.parse(key)

    const { iv } = opt
    this.option = opt
    if (iv) {
      this.option.iv = CryptoJS.enc.Utf8.parse(iv)
    }
  }

  encrypt(str: string) {
    return CryptoJS.AES.encrypt(str, this.key, this.option).toString()
  }

  decrypt(str: string) {
    return CryptoJS.AES.decrypt(str, this.key, this.option).toString(CryptoJS.enc.Utf8)
  }
}
