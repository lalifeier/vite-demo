import type { AxiosRequestConfig } from 'axios'
import { AxiosTransform } from './axiosTransform'
import { AxiosInterceptor } from './core/interceptor'

export interface HttpOptions extends AxiosRequestConfig {
  interceptor?: AxiosInterceptor
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}
export interface RequestOptions {
  apiUrl?: string
  joinPrefix?: boolean
  joinTime?: boolean
  ignoreCancel?: boolean
}
export interface Result<T = any> {
  code: number
  data: T
  message: string
}
export interface UploadFileParams {
  data?: any
  name?: string
  file: File | Blob
  filename?: string
  [key: string]: any
}
