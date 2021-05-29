import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestOptions, Result } from './types'

export abstract class AxiosTransform {
  transformRequest?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  transformResponse?: (response: AxiosResponse<Result>, options: RequestOptions) => any
}
