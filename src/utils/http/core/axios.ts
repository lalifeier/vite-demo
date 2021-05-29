import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import qs from 'qs'
import { isFunction } from '../../is'
import { ContentType } from '../emum'
import type { HttpOptions, RequestOptions, Result, UploadFileParams } from '../types'
import { AxiosCanceler } from './cancel'

export class Request {
  private instance: AxiosInstance

  private readonly options: HttpOptions

  constructor(options: HttpOptions) {
    this.options = options
    this.instance = axios.create(options)

    this.setupInterceptors()
  }

  // getInstance() {
  //   this.instance || this.instance = new Request()
  //   return this.instance
  // }

  setupInterceptors() {
    const { interceptor, requestOptions = {} } = this.options
    if (!interceptor) {
      return
    }

    const axiosCanceler = new AxiosCanceler()

    const { ignoreCancel } = requestOptions

    const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } =
      interceptor
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      ignoreCancel && axiosCanceler.addPending(config)

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config)
      }
      return config
    }, undefined)

    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.instance.interceptors.request.use(undefined, requestInterceptorsCatch)

    this.instance.interceptors.response.use((res: AxiosResponse<any>) => {
      ignoreCancel && axiosCanceler.removePending(res.config)

      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.instance.interceptors.response.use(undefined, responseInterceptorsCatch)
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
    const { transform = {}, requestOptions } = this.options
    const { transformRequest, transformResponse } = transform
    const option: RequestOptions = Object.assign({}, requestOptions, options)

    if (transformRequest && isFunction(transformRequest)) {
      config = transformRequest(config, option)
    }

    this.transformRequest(config)

    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res: AxiosResponse<Result>) => {
          if (transformResponse && isFunction(transformResponse)) {
            try {
              resolve(transformResponse(res, option))
            } catch (err) {
              reject(err)
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((err) => {
          reject(err)
        })
    })
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
      headers: { 'Content-Type': ContentType.FORM_DATA },
    })
  }
}
