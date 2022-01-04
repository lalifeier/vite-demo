// blob --> file --> dataURL(base64) | blobURL --> blob
export function blobToFile(blob: Blob, filename: string): File {
  return new File([blob], filename, { lastModified: new Date().getTime(), type: blob.type })
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = () => {
      reject(new Error('blobToBase64 error'))
    }
  })
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(reader.result as string)
    }
    reader.onerror = () => {
      reject(new Error('fileToBase64 error'))
    }
  })
}

export function base64ToBlob(base64: string): Blob {
  const parts = base64.split(';base64,')
  const type = parts[0].split(':')[1]
  const decodedData = atob(parts[1])
  let n = decodedData.length
  const uInt8Array = new Uint8Array(n)
  while (n--) {
    uInt8Array[n] = decodedData.charCodeAt(n)
  }
  return new Blob([uInt8Array], { type })
}

export function base64ToFile(base64: string, filename: string): File {
  const parts = base64.split(';base64,')
  const type = parts[0].split(':')[1]
  const suffix = type.split('/')[1]
  const decodedData = atob(parts[1])
  let n = decodedData.length
  const uInt8Array = new Uint8Array(n)
  while (n--) {
    uInt8Array[n] = decodedData.charCodeAt(n)
  }
  return new File([uInt8Array], `${filename}.${suffix}`, { type })
}

// type image/png
// type image/jpeg image/webp quality 0-1
export function urlToBase64(url: string, mineType = 'image/jpeg', quality = 1): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('canvas') as HTMLCanvasElement | null
    const context = canvas!.getContext('2d')
    const image = new Image()
    image.onload = function () {
      if (!canvas || !context) {
        return reject()
      }
      canvas.width = image.width
      canvas.height = image.height
      context.drawImage(image, 0, 0)
      const dataURL = canvas.toDataURL(mineType, quality)
      canvas = null
      resolve(dataURL)
    }
    image.setAttribute('crossOrigin', 'Anonymous')
    image.src = url
    image.onerror = () => {
      reject(new Error('urlToBase64 error'))
    }
  })
}

export function getFileNameByUrl(url: string): string {
  return url.substring(url.lastIndexOf('/') + 1, url.length)
}

export function transformByte(size: number) {
  if (!size) {
    return '0B'
  }
  const num = 1024.0
  if (size < num) {
    return size + 'B'
  }
  if (size < Math.pow(num, 2)) {
    return (size / num).toFixed(2) + 'K'
  }
  if (size < Math.pow(num, 3)) {
    return (size / Math.pow(num, 2)).toFixed(2) + 'M'
  }
  if (size < Math.pow(num, 4)) {
    return (size / Math.pow(num, 3)).toFixed(2) + 'G'
  }
  return (size / Math.pow(num, 4)).toFixed(2) + 'T'
}
