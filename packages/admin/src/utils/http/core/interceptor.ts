import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export abstract class AxiosInterceptor {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

  requestInterceptorsCatch?: (error: Error) => void;

  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  responseInterceptorsCatch?: (error: Error) => void;
}
