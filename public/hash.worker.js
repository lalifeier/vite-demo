importScripts("https://unpkg.com/spark-md5@3.0.2/spark-md5.min.js");

onmessage = (event) => {
  const { file, chunkSize } = event.data
  createFileMd5(file, chunkSize)
}

function createFileMd5 (file, chunkSize) {
  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
  const chunks = Math.ceil(file.size / chunkSize);
  const spark = new SparkMD5.ArrayBuffer();
  const fileReader = new FileReader();
  let currentChunk = 0;
  let percentage = 0

  fileReader.onload = (e) => {
    spark.append(e.target?.result)
    currentChunk++;

    if (currentChunk < chunks) {
      percentage += 100 / chunks;
      postMessage({
        percentage
      });

      loadNext();
    } else {
      const hash = spark.end();
      postMessage({
        percentage: 100,
        hash
      });
    }
  };

  fileReader.onerror = (err) => {
    console.log(err)
  };

  function loadNext () {
    const start = currentChunk * chunkSize;
    const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }
  loadNext()
}
