import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import qs from 'qs'
import { ContentType } from './emum'
import type { RequestOptions, UploadFileParams } from './types'

export class Request {
  private instance: AxiosInstance

  private config

  constructor(config) {
    this.instance = axios.create(config)

    this.setupInterceptors()
  }

  // getInstance() {
  //   this.instance || this.instance = new Request()
  //   return this.instance
  // }

  setupInterceptors() {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config = this.requestInterceptors(config)
      return config
    }, this.requestInterceptorsCatch)

    this.instance.interceptors.response.use((res: AxiosResponse<any>) => {
      return res
    }, this.responseInterceptorsCatch)
  }

  requestInterceptors(config) {
    // if (store.getters.access_token) {
    //   config.headers.Authorization = cookies.get(ACCESS_TOKEN)
    // }
    return config
  }

  requestInterceptorsCatch(error) {
    return Promise.reject(error)
  }

  responseInterceptors(res) {
    return res
  }

  responseInterceptorsCatch(error) {
    return Promise.reject(error)
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    const headers = config.headers || this.config.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']
    if (
      contentType === ContentType.FORM_URLENCODED &&
      config.method?.toUpperCase() !== 'GET' &&
      Reflect.has(config, 'data')
    ) {
      config.data = qs.stringify(config.data, { arrayFormat: 'brackets' })
    }

    console.log(options)

    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res as unknown as Promise<T>)
        })
        .catch((e) => {
          reject(e)
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
