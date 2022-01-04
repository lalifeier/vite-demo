import SparkMD5 from 'spark-md5'
import hashWorker from './hash.worker.js?worker'

export const DEFAULT_CHUNK_SIZE = 2 * 1024 * 1024

export function createFileChunk(file: File, chunkSize = DEFAULT_CHUNK_SIZE) {
  const size = file.size
  const fileChunkList: Blob[] = []
  let cur = 0
  while (cur < size) {
    fileChunkList.push(file.slice(cur, cur + chunkSize))
    cur += chunkSize
  }
  return fileChunkList
}

export function createFileSampleChunk(file: File, chunkSize = DEFAULT_CHUNK_SIZE, chunkByte = 2) {
  const size = file.size
  const fileChunkList: Blob[] = []
  let cur = chunkSize

  fileChunkList.push(file.slice(0, chunkSize))
  while (cur < size) {
    if (cur + chunkSize >= size) {
      fileChunkList.push(file.slice(cur, size))
    } else {
      const mid = cur + chunkSize / chunkByte
      const end = cur + chunkSize
      fileChunkList.push(file.slice(cur, cur + chunkByte))
      fileChunkList.push(file.slice(mid, mid + chunkByte))
      fileChunkList.push(file.slice(end - chunkByte, end))
    }
    cur += chunkSize
  }
  return fileChunkList
}

export function createFileHash(fileChunkList) {
  return new Promise(async (resolve) => {
    const spark = new SparkMD5.ArrayBuffer()
    const buffers = await Promise.all(
      fileChunkList.map(
        (chunk) =>
          new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(chunk)
            reader.onload = (event) => {
              resolve(event.target?.result)
            }
          })
      )
    )
    buffers.forEach((buffer) => spark.append(buffer))
    resolve(spark.end())
  })
}

export function createFileHashInWorker(fileChunkList) {
  return new Promise((resolve) => {
    const worker = new hashWorker()
    worker.postMessage({ fileChunkList })
    worker.onmessage = (e) => {
      const { hash } = e.data
      // console.log(percentage, hash)
      hash && resolve(hash)
    }
  })
}

export function createFileMd5(file: File, chunkSize = DEFAULT_CHUNK_SIZE) {
  return new Promise((resolve, reject) => {
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    const chunks = Math.ceil(file.size / chunkSize)
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    let currentChunk = 0

    fileReader.onload = (e) => {
      spark.append(e.target?.result)
      currentChunk++

      if (currentChunk < chunks) {
        loadNext()
      } else {
        const hash = spark.end()
        resolve(hash)
      }
    }

    fileReader.onerror = (err) => {
      reject(err)
    }

    function loadNext() {
      const start = currentChunk * chunkSize
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }
    loadNext()
  })
}
