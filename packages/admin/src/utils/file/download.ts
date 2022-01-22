import { asyncPool } from '@/utils/async-pool'
import { getFileNameByUrl, urlToBase64 } from '.'

export function saveAs(blob: any, filename = 'download') {
  if (typeof blob === 'string') {
    download(blob, filename)
    return
  }
  const link = document.createElement('a')
  const blobURL = URL.createObjectURL(blob)
  link.download = filename
  link.href = blobURL
  link.click()
  URL.revokeObjectURL(blobURL)
  link.remove()
}

export async function downloadImage(url: string, filename: string) {
  filename = filename || getFileNameByUrl(url)
  saveAs(await urlToBase64(url), filename)
}

export function download(url: string, filename: string, method = 'GET', body?: string) {
  filename = filename || getFileNameByUrl(url)
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  if (method.toLocaleLowerCase() === 'post') {
    xhr.setRequestHeader('Content-Type', 'application/json')
  }
  xhr.responseType = 'blob'
  xhr.onload = function () {
    saveAs(xhr.response, filename)
  }
  xhr.send(body)
}

// export async function download(url: string, filename: string, method = 'GET', body?: string) {
//   filename = filename || getFileNameByUrl(url)
//   let params: any = {
//     method,
//   }
//   if (method.toLocaleLowerCase() === 'post') {
//     params = Object.assign(params, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body,
//     })
//   }
//   const res = await fetch(params)
//   const blob = await res.blob()
//   saveAs(blob, filename)
// }

export async function multiThreadDownload(url, chunkSize = 10 * 1024 * 1024, poolLimit = 6) {
  const contentLength = await getContentLength(url)
  const chunks = typeof chunkSize === 'number' ? Math.ceil(contentLength / chunkSize) : 1
  const results: any = await asyncPool(poolLimit, Array.from(new Array(chunks).keys()), (i) => {
    const start = i * chunkSize
    const end = i + 1 == chunks ? contentLength - 1 : (i + 1) * chunkSize - 1
    return getBinaryContent(url, start, end, i)
  })
  const sortedBuffers = results.map((item) => new Uint8Array(item.buffer))
  return concatenate(sortedBuffers)
}

function getContentLength(url): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('HEAD', url)
    xhr.send()
    xhr.onload = function () {
      resolve(xhr.getResponseHeader('Content-Length'))
    }
    xhr.onerror = reject
  })
}

function getBinaryContent(url, start, end, i) {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.setRequestHeader('range', `bytes=${start}-${end}`)
      xhr.responseType = 'arraybuffer'
      xhr.onload = function () {
        resolve({
          index: i,
          buffer: xhr.response,
        })
      }
      xhr.send()
    } catch (err) {
      reject(new Error(err))
    }
  })
}

function concatenate(arrays) {
  if (!arrays.length) return null
  const totalLength = arrays.reduce((acc, value) => acc + value.length, 0)
  const result = new Uint8Array(totalLength)
  let length = 0
  for (const array of arrays) {
    result.set(array, length)
    length += array.length
  }
  return result
}
