import md5 from 'crypto-js/md5'

export function encrypt(str: string): string {
  return md5(str).toString()
}
