import { getFileNameByUrl, urlToBase64 } from '.'

export function download(object: any, filename = 'filename') {
  const blobURL = URL.createObjectURL(object)
  const link = document.createElement('a')
  link.download = filename
  link.href = blobURL
  link.click()
  URL.revokeObjectURL(blobURL)
  link.remove()
}

export async function downloadImage(url: string, filename: string) {
  filename = filename || getFileNameByUrl(url)
  download(await urlToBase64(url), filename)
}

export function downloadByUrl({
  url,
  filename,
  method = 'GET',
  body = '',
}: {
  url: string
  filename: string
  method?: string
  body?: string
}) {
  filename = filename || getFileNameByUrl(url)
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  if (method.toLocaleLowerCase() === 'post') {
    xhr.setRequestHeader('Content-Type', 'application/json')
  }
  xhr.responseType = 'blob'
  xhr.onload = function () {
    download(xhr.response, filename)
  }
  xhr.send(body)
}

export async function downloadByUrl2({
  url,
  filename,
  method = 'GET',
  body = '',
}: {
  url: string
  filename: string
  method?: string
  body?: string
}) {
  filename = filename || getFileNameByUrl(url)

  let params: any = {
    method,
  }
  if (method.toLocaleLowerCase() === 'post') {
    params = Object.assign(params, {
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
  }
  const res = await fetch(params)
  const blob = await res.blob()
  download(blob, filename)
}
