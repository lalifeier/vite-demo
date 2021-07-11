<template>
  <div class="text-blue-500" @click="handleHttp">TailwindCSS setup</div>
</template>

<script>
  import { defineComponent } from 'vue'

  import { http } from '/@/utils/http'

  import { multiThreadDownload } from '/@/utils/file/download'

  export default defineComponent({
    name: 'Index',
    setup() {
      async function handleHttp() {
        const res = await http.post(
          {
            url: '/user/login'
          },
          {
            cancelRepeatRequest: true,
            retryTimes: 5,
            cache: true,
            expire: 3 * 1000
          }
        )
        console.log(res)

        window.aa.b

        multiThreadDownload('https://www.runoob.com/try/demo_source/movie.mp4')
      }
      return { handleHttp }
    }
  })
</script>

<style></style>
