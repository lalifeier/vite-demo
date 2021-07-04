<template>
  <VirtualList style="height: 100vh" :data="data" :item-size="itemSize" />
</template>

<script lang="ts">
import VirtualList from './virtualList.vue'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

const state: any = reactive({
  data: [],
  itemSize: 100,
})

let data: any = []
for (let index = 0; index < 100000000; index++) {
  data.push(index)
}

export default defineComponent({
  components: { VirtualList },
  setup() {
    state.data = data
    onMounted(() => {})

    return {
      ...toRefs(state),
    }
  },
})
</script>

<style scoped></style>
