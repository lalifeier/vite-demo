import SparkMD5 from 'spark-md5'

self.onmessage = async (event) => {
  const { fileChunkList } = event.data
  const spark = new SparkMD5.ArrayBuffer()
  let percentage = 0
  const size = 100 / fileChunkList.length
  const buffers = await Promise.all(
    fileChunkList.map(
      (chunk) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.readAsArrayBuffer(chunk)
          reader.onload = (event) => {
            percentage += size
            self.postMessage({ percentage: Number(percentage.toFixed(2)) })
            resolve(event.target.result)
          }
        })
    )
  )
  buffers.forEach((buffer) => spark.append(buffer))
  self.postMessage({ percentage: 100, hash: spark.end() })
  self.close()
}
