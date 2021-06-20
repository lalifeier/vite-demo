export function is(val: unknown, type: string) {
  const { toString } = Object.prototype
  return toString.call(val) === `[object ${type}]`
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return typeof val === 'undefined'
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function inBrowser() {
  return typeof window !== 'undefined' && window !== null
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName
}

export function isUrl(url: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(url)
}

export function isPrimitive(val: any): boolean {
  return typeof val === 'object' ? val === null : typeof val !== 'function'
}

export function isValidKey(key: any): boolean {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype'
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isEdge() {
  return navigator.userAgent.indexOf('Edge') > -1
}

export function isFirefox() {
  return !!window.navigator.userAgent.match(/firefox/i)
}

export function isMobile() {
  return /Android|webOS|i?Phone|iPad|iPod|BlackBerry|Mobile/i.test(navigator.userAgent)
}
