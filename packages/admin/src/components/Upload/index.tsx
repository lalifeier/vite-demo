import { createFileChunk, createFileHashInWorker, createFileSampleChunk } from '@/utils/file/upload'
import { defineComponent, ref, unref } from 'vue'

const props = {
  disabled: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number as PropType<Nullable<number>>,
    default: null,
  },
  accept: {
    type: String,
    default: '',
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  drag: {
    type: Boolean,
    default: false,
  },

  chunkSize: {
    type: Number,
    default: 10 * 1024 * 1024,
  },
  threads: {
    type: Number,
    default: 3,
  },
  retry: {
    type: Number,
    default: 3,
  },

  beforeUpload: {
    type: Function,
    default: null,
  },
  onExceed: {
    type: Function,
    default: null,
  },
  onProgress: {
    type: Function,
    default: null,
  },
  onSuccess: {
    type: Function,
    default: null,
  },
  onError: {
    type: Function,
    default: null,
  },
  onRemove: {
    type: Function,
    default: null,
  },
}

export type UploadStatus = 'ready' | 'pause' | 'uploading' | 'success' | 'fail'

export interface UploadFile {
  name: string
  percentage?: number
  status: UploadStatus
  size: number
  file: File
}

export default defineComponent({
  name: 'Upload',
  props,
  setup(props, { slots }) {
    const inputRef = ref<HTMLInputElement | null>(null)

    // async function uploadChunks(data, uploadedList = []) {
    // uploadApi({})
    // const requestList = data.map(({ chunk, hash, index }) => {
    //   return {
    //     chunk,
    //     hash,
    //     fileHash: unref(hash),
    //     filename: file.value.name
    //   }
    // })
    // const requestList = data
    //   .filter(({ hash }) => !uploadedList.includes(hash))
    //   .map(({ chunk, hash, index }) => {
    //     const formData = new FormData();
    //     formData.append("chunk", chunk);
    //     formData.append("hash", hash);
    //     formData.append("filename", file.name);
    //     formData.append("fileHash", this.container.hash);
    //     return { formData, index };
    //   })
    // .map(async ({ formData, index }) =>
    // this.request({
    //   url: "http://localhost:3000",
    //   data: formData,
    //   onProgress: this.createProgressHandler(this.data[index]),
    //   requestList: this.requestList
    // })
    // );
    // await Promise.all(requestList)
    // if (uploadedList.length + requestList.length === data.length) {
    // await this.mergeRequest();
    // }
    // }

    async function post(rawFile: File) {
      const fileChunkList = createFileChunk(rawFile)

      const hash = await createFileHashInWorker(fileChunkList)

      console.log('sampleHash', await createFileHashInWorker(createFileSampleChunk(rawFile)))

      console.log('hash', await createFileHashInWorker(createFileChunk(rawFile)))

      // console.log('slow hash', await createFileHash(createFileChunk(file)))

      // console.log('slow sampleHash', await createFileHash(createFileSampleChunk(file)))

      // const { shouldUpload, uploadedList } = await verifyUpload({
      //   filename: file.name,
      //   fileHash: hash
      // });
      // if (!shouldUpload) {
      //   return
      // }
      const uploadedList: number[] = []

      const data = fileChunkList.map((file, index) => ({
        fileHash: hash,
        index,
        hash: hash + '-' + index,
        chunk: file,
        size: file.size,
        percentage: uploadedList.includes(index) ? 100 : 0,
      }))

      console.log(data)

      // uploadChunks(data)
    }

    function upload(rawFile: File) {
      if (inputRef.value) {
        inputRef.value.value = ''
      }

      const { beforeUpload, onRemove } = props
      if (!beforeUpload) {
        return post(rawFile)
      }

      const before = beforeUpload(rawFile)
      if (before instanceof Promise) {
        before
          .then(() => {
            post(rawFile)
          })
          .catch(() => {
            onRemove(null, rawFile)
          })
      } else if (before !== false) {
        post(rawFile)
      } else {
        onRemove(null, rawFile)
      }
    }

    function uploadFiles(files: FileList) {
      const { limit, onExceed, autoUpload, multiple } = props
      if (limit && files.length > limit) {
        onExceed && onExceed(files)
        return
      }
      let postFiles = Array.from(files)
      if (!multiple) {
        postFiles = postFiles.slice(0, 1)
      }
      if (postFiles.length === 0) {
        return
      }
      postFiles.forEach((rawFile) => {
        autoUpload && upload(rawFile)
      })
    }

    function handleFileChange(e: Event) {
      const files = (e.target as HTMLInputElement).files
      if (!files) {
        return
      }
      uploadFiles(files)
    }

    function handlePause() {}

    function handleResume() {}

    function handleUpload() {
      if (props.disabled) {
        return
      }
      if (inputRef.value) {
        inputRef.value.value = ''
        inputRef.value.click()
      }
    }

    return () => (
      <div>
        <input
          v-show={false}
          ref={inputRef}
          type="file"
          multiple={unref(props.multiple)}
          accept={unref(props.accept)}
          onChange={handleFileChange}
        />
        <div onClick={handleUpload}>{slots.default?.()}</div>
        <div onClick={handlePause}></div>
        <div onClick={handleResume}></div>
      </div>
    )
  },
})
