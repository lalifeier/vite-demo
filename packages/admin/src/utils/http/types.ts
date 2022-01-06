import type { AxiosRequestConfig } from 'axios';
import { AxiosInterceptor } from './core/interceptor';

export interface HttpOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  interceptor?: AxiosInterceptor;
  requestOptions?: RequestOptions;
}
export interface RequestOptions {
  apiUrl?: string;
  joinPrefix?: boolean;
  joinTime?: boolean;

  loading?: boolean;
  cancelRepeatRequest?: boolean;
  retryTimes?: number;
  retryDelay?: number;
  cache?: boolean;
  expire?: number;

  nativeResponse?: boolean;
  transformResponse?: boolean;

  filterParams?: boolean;
}
export interface Result<T = any> {
  code: number;
  data: T;
  message: string;
}
export interface UploadFileParams {
  data?: any;
  name?: string;
  file: File | Blob;
  filename?: string;
  [key: string]: any;
}
