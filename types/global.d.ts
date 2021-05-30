declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
  }
}

import type { PropType as VuePropType } from 'vue'
declare global {
  declare type Nullable<T> = T | null

  declare type PropType<T> = VuePropType<T>
}
