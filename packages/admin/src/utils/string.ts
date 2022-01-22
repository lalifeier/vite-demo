export const escapeRegexpString = (value = ''): string => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

export function escapeString(str: string): string {
  if (!str) return ''
  return str.replace(/[\0\n\r\b\t\\'"\x1a]/g, (s) => {
    switch (s) {
      case '\0':
        return '\\0'
      case '\n':
        return '\\n'
      case '\r':
        return '\\r'
      case '\b':
        return '\\b'
      case '\t':
        return '\\t'
      case '\x1a':
        return '\\Z'
      default:
        return `\\${s}`
    }
  })
}
