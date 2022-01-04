import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import qs from 'qs'
import { isFunction } from '../../is'
import { ContentType } from '../enum'
import type { HttpOptions, RequestOptions, UploadFileParams } from '../types'
import { getCacheRequest, setCacheRequest } from './cacheRequest'
import { AxiosCanceler } from './cancelRepeatRequest'
import { closeLoading, showLoading } from './loadingRequest'
import { retryRequest } from './retryRequest'

export class HttpRequest {
  private instance: AxiosInstance

  private readonly options: HttpOptions

  constructor(options: HttpOptions) {
    this.options = options
    this.instance = axios.create(options)

    this.setupInterceptors()
  }

  getInstance() {
    return this.instance || new HttpRequest({})
  }

  setupInterceptors() {
    const { interceptor = {} } = this.options

    const axiosCanceler = new AxiosCanceler()

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = interceptor
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const { cancelRepeatRequest, loading, cache } = config['requestOptions'] || {}

        if (cancelRepeatRequest) {
          axiosCanceler.removePending(config)
          axiosCanceler.addPending(config)
        }

        cache && getCacheRequest(config)

        loading && showLoading()

        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config)
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.instance.interceptors.request.use(undefined, requestInterceptorsCatch)

    this.instance.interceptors.response.use(
      (res: AxiosResponse<any>) => {
        const requestOptions = res.config['requestOptions'] || {}
        const { cancelRepeatRequest, loading, cache } = requestOptions

        cancelRepeatRequest && res.config && axiosCanceler.removePending(res.config)

        cache && res && setCacheRequest(res, requestOptions.expire)

        if (responseInterceptors && isFunction(responseInterceptors)) {
          res = responseInterceptors(res)
        }

        loading && closeLoading()

        return res
      },
      (error) => {
        const { config = {}, data } = error.message || {}

        const { cancelRepeatRequest, loading, cache } = config.requestOptions || {}

        cancelRepeatRequest && config && axiosCanceler.removePending(config)

        !axios.isCancel(error) && retryRequest(this.instance, error)

        if (cache && axios.isCancel(error) && data) {
          console.log('获取缓存')
          return Promise.resolve(data.data)
        }

        responseInterceptorsCatch &&
          isFunction(responseInterceptorsCatch) &&
          responseInterceptorsCatch(error)

        loading && closeLoading()
      }
    )
  }

  transformRequest(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']
    if (
      contentType === ContentType.FORM_URLENCODED &&
      config.method?.toUpperCase() !== 'GET' &&
      Reflect.has(config, 'data')
    ) {
      config.data = qs.stringify(config.data, { arrayFormat: 'brackets' })
    }
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    const option: any = Object.assign({}, config, { requestOptions: options })

    this.transformRequest(option)

    return this.instance.request(option)
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  head<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'HEAD' }, options)
  }

  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams): Promise<T> {
    const formData = new FormData()

    const { name = 'file', file, filename, data } = params
    if (data) {
      Object.keys(data).forEach((key) => {
        const value = data[key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, value)
      })
    }

    formData.append(name, file, filename)

    return this.request({
      ...config,
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': ContentType.FORM_DATA }
    })
  }
}
