import { isObject } from './is'

export function typeOf(obj: unknown) {
  const { toString } = Object.prototype
  const map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  return map[toString.call(obj)]
}

export function deepClone(data: any) {
  const t = typeOf(data)
  let o: any

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (const item of data) {
      o.push(deepClone(item))
    }
  } else if (t === 'object') {
    for (const key in data) {
      o[key] = deepClone(data[key])
    }
  }
  return o
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export function openWindow(url: string, opt?: { target?: string; noopener?: boolean; noreferrer?: boolean }) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const features: string[] = []

  noopener && features.push('noopener=yes')
  noreferrer && features.push('noreferrer=yes')

  window.open(url, target, features.join(','))
}
