<template>
  <div class="virtual-list-demo">
    <VirtualList style="height: 100vh" :data="data" :item-size="40" :buffer-size="0">
      <template #default="{ item }">
        <div class="virtual-list-demo-item">{{ item }}</div>
      </template>
    </VirtualList>
  </div>
</template>

<script lang="ts">
  import VirtualList from '../../components/VirtualList'

  import { defineComponent } from 'vue'

  let data: any = []
  for (let index = 0; index < 10000000; index++) {
    data.push(index)
  }

  export default defineComponent({
    components: { VirtualList },
    setup() {
      return {
        data
      }
    }
  })
</script>

<style lang="scss" scoped>
  .virtual-list-demo {
    display: flex;
    justify-content: center;
    &-item {
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
  }
</style>
