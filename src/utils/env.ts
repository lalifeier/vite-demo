import { GlobConfig, GlobEnvConfig } from '#/config'

export const DEV = 'development'
export const PROD = 'production'

export const isDev = import.meta.env.DEV
export const isProd = import.meta.env.PROD

export function getMode(): string {
  return import.meta.env.MODE
}

export function useGlobConfig(): Readonly<GlobConfig> {
  const env = import.meta.env as unknown as GlobEnvConfig

  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_APP_SHORT_NAME } = env

  return {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    short_name: VITE_GLOB_APP_SHORT_NAME
  }
}
