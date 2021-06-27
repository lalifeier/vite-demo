declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
  }
}

import type { PropType as VuePropType } from 'vue';
declare global {
  declare type Nullable<T> = T | null

  declare type PropType<T> = VuePropType<T>

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;
}
