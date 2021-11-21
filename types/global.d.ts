declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
  }
}

import type { PropType as VuePropType } from 'vue'
declare global {
  interface Document {
    documentMode?: any
  }

  declare type Nullable<T> = T | null

  declare type PropType<T> = VuePropType<T>

  declare type TimeoutHandle = ReturnType<typeof setTimeout>
  declare type IntervalHandle = ReturnType<typeof setInterval>

  declare type Recordable<T = any> = Record<string, T>

  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }

  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }
  declare interface ViteEnv {
    VITE_PORT: number
    VITE_GLOB_APP_TITLE: string
    VITE_PUBLIC_PATH: string
    VITE_PROXY: [string, string][]
    VITE_DROP_CONSOLE: boolean
    VITE_LEGACY: boolean
    VITE_PWA: boolean
    VITE_COMPRESS: 'gzip' | 'brotli' | 'none'
    VITE_COMPRESS_DELETE_ORIGIN_FILE: boolean
    VITE_IMAGEMIN: boolean
    VITE_SENTRY: boolean | string
    VITE_SENTRY_DSN: string
  }
}
