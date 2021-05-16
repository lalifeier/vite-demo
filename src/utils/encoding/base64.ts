import Base64 from 'crypto-js/enc-base64'
import UTF8 from 'crypto-js/enc-utf8'

export function encrypt(str: string): string {
  return UTF8.parse(str).toString(Base64)
}

export function decrypt(str: string): string {
  return Base64.parse(str).toString(UTF8)
}
