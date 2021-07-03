<template>
  <div>
    <img v-for="(item, index) in images" :key="index" v-lazy="item" class="lazy" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const images = [
      'https://article-fd.zol-img.com.cn/t_s627x449/g6/M00/07/00/ChMkKl-7j82IM9KTAAPn0WO6WtEAAFubAPtVd4AA-fp664.png',
      'https://article-fd.zol-img.com.cn/t_s640x560/g6/M00/07/00/ChMkKV-7j8yIfRybAAeUzN2S-GcAAFubAPUqlEAB5Tk317.png',
      'https://article-fd.zol-img.com.cn/t_s640x359/g6/M00/07/00/ChMkKV-7j8qICSISAATqB3abUOIAAFubQP1QyMABOof216.png',
      'https://article-fd.zol-img.com.cn/t_s640x481/g6/M00/07/00/ChMkKl-7j8qISTtxAAYwGecnqdsAAFubQPr_JYABjAx866.png',
      'https://article-fd.zol-img.com.cn/t_s640x709/g6/M00/07/00/ChMkKl-7j8yIWZXlAAU_dwj8c0AAAFubAPNuMAABT-P182.png',
      'https://article-fd.zol-img.com.cn/t_s640x496/g6/M00/07/00/ChMkKV-7j82IaXWcAAf1A1qo0-gAAFubAPcPzUAB_Ub040.png',
      'https://article-fd.zol-img.com.cn/t_s640x286/g6/M00/07/00/ChMkKV-7j8qIRV9LAAC1WTJ8wRUAAFubQP6LUIAALVx696.jpg',
    ]

    return {
      images,
    }
  },
})
</script>

<style scoped>
img {
  display: block;
  height: 400px;
}
</style>
