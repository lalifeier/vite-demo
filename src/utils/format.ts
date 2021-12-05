import type { CSSProperties } from 'vue';

export function convertToUnit(
  str: string | number | null | undefined,
  unit = 'px'
): string | undefined {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(+str)) {
    return String(str)
  } else if (!isFinite(+str)) {
    return undefined
  } else {
    return `${Number(str)}${unit}`
  }
}

export function formatDate(date: Date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
  const o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length))
    }
  }
  return fmt
}

export const formatPrice = (number: number, currency?: string) => formatNumber(number, { style: 'currency', currency })

export const formatPercentage = (number: number, digits?: number) => formatNumber(number, { style: 'percent', useGrouping: false, maximumFractionDigits: digits })

export const formatNumber = (number: number, options: Intl.NumberFormatOptions = { maximumFractionDigits: 2 }, locale: string = 'en-US') =>
  new Intl.NumberFormat(locale, options).format(number)

export function getZIndexStyle(zIndex?: string | number) {
  const style: CSSProperties = {};
  if (zIndex !== undefined) {
    style.zIndex = +zIndex
  }
  return style
}
