import dayjs from 'dayjs'

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD '

export function formatToDateTime(date: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format)
}

export function formatToDate(date: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
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
