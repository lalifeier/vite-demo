export interface RequestOptions {
  apiUrl?: string
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
