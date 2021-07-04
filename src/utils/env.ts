export const DEV = 'development'
export const PROD = 'production'

export const isDev = import.meta.env.DEV
export const isProd = import.meta.env.PROD

export function getMode(): string {
  return import.meta.env.MODE
}
