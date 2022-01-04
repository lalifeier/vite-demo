import { decrypt, encrypt } from 'crypto-js/aes'
import Base64 from 'crypto-js/enc-base64'
import UTF8, { parse } from 'crypto-js/enc-utf8'
import md5 from 'crypto-js/md5'
import ECB from 'crypto-js/mode-ecb'
import pkcs7 from 'crypto-js/pad-pkcs7'

interface Option {
  iv?: any
  mode?: any
  padding?: any
}

export class AES {
  private key
  private option

  constructor(
    key: string,
    opt: Option = {
      iv: '',
      mode: ECB,
      padding: pkcs7
    }
  ) {
    this.option = opt

    this.key = parse(key)

    const { iv } = opt
    if (iv) {
      this.option.iv = parse(iv)
    }
  }

  encrypt(str: string) {
    return encrypt(str, this.key, this.option).toString()
  }

  decrypt(str: string) {
    return decrypt(str, this.key, this.option).toString(UTF8)
  }
}

export function encryptBase64(str: string): string {
  return UTF8.parse(str).toString(Base64)
}

export function decryptBase64(str: string): string {
  return Base64.parse(str).toString(UTF8)
}

export function encryptMd5(str: string): string {
  return md5(str).toString()
}
