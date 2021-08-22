import Clipboard from 'clipboard'
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
    '[object Object]': 'object'
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

export function openWindow(
  url: string,
  opt?: { target?: string; noopener?: boolean; noreferrer?: boolean }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const features: string[] = []

  noopener && features.push('noopener=yes')
  noreferrer && features.push('noreferrer=yes')

  window.open(url, target, features.join(','))
}

export const copy = (text: string, event: Event) => {
  const el = event.target as Element
  const clipboard = new Clipboard(el, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboard.destroy()
  })
  clipboard.on('error', (err) => {
    console.log(err)
    clipboard.destroy()
  })
  ;(clipboard as any).onClick(event)
}

export function debounce(func: Function, wait: number, immediate: boolean) {
  let timer
  return function (this, ...args) {
    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(this, args)
    } else {
      timer = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
  }
}

export function throttle(func: Function, wait: number) {
  let timer
  return function (this, ...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        func.apply(this, args)
      }, wait)
    }
  }
}

export const memoize = (fn) =>
  new Proxy(fn, {
    // @ts-ignore
    cache: new Map(),
    apply(target, thisArg, argsList) {
      const cacheKey = argsList.toString()
      const currentCache = (this as any).cache
      if (!currentCache.has(cacheKey)) currentCache.set(cacheKey, target.apply(thisArg, argsList))
      return currentCache.get(cacheKey)
    }
  })

const fibonacci = (n) => (n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2))
const memoizedFibonacci = memoize(fibonacci)

for (let i = 0; i < 100; i++) fibonacci(30)
for (let i = 0; i < 100; i++) memoizedFibonacci(30)
