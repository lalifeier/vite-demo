import { http } from '@/utils/http'
import { UploadFileParams } from '@/utils/http/types'

enum Api {
  Upload = '/upload'
}

export function uploadApi(
  params: UploadFileParams,
  onUploadProgress?: (progressEvent: ProgressEvent) => void
) {
  return http.uploadFile(
    {
      url: Api.Upload,
      onUploadProgress
    },
    params
  )
}
