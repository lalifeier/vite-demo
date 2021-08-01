<template>
  <div>
    <!-- <Loading></Loading> -->

    <!-- <div v-loading @click="handleClick()"></div> -->
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  // import { Loading } from '../../components/Loading'

  // import { http } from '/@/utils/http'

  // import { multiThreadDownload } from '/@/utils/file/download'

  export default defineComponent({
    name: 'Index',
    // components: { Loading },
    setup() {
      // async function handleHttp() {
      //   const res = await http.post(
      //     {
      //       url: '/user/login'
      //     },
      //     {
      //       cancelRepeatRequest: true,
      //       retryTimes: 5,
      //       cache: true,
      //       expire: 3 * 1000
      //     }
      //   )
      //   console.log(res)
      //   window.aa.b
      //   multiThreadDownload('https://www.runoob.com/try/demo_source/movie.mp4')
      // }
      // return { handleHttp }
      // const handleClick = () => {}
    }
  })
</script>

<style></style>
