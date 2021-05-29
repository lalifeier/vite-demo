<template>
  <div class="text-blue-500" @click="handleHttp">TailwindCSS setup</div>
</template>

<script>
import { defineComponent } from 'vue'

import { http } from '/@/utils/http'

export default defineComponent({
  name: 'Index',
  setup() {
    function handleHttp() {
      http.get(
        {
          url: 'http://localhost:3000/#/index',
        },
        {}
      )
    }
    return { handleHttp }
  },
})
</script>

<style></style>
