import { isDate } from '@/utils/is'
import dayjs from 'dayjs'

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD '

export function formatDateTime(date: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format)
}

export function formatDate(date: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

export function getPrevMonthDays() {
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - 1)
  const start = dayjs(startDate).date(1).format('YYYY-MM-DD')
  const endDate = new Date()
  const end = dayjs(endDate).date(0).format('YYYY-MM-DD')
  return { start, end }
}

export function isValidDate(date: Date): boolean {
  return isDate(date) && !isNaN(date.getTime())
}

export const timestamp = () => +Date.now()
