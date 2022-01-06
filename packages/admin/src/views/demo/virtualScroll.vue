<template>
  <div class="virtual-list-demo virtual-list-demo-1">
    <VirtualList style="height: 100vh" :data="data" :item-size="40" :buffer-size="0">
      <template #default="{ item }">
        <div class="virtual-list-demo-item">{{ item }}</div>
      </template>
    </VirtualList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VirtualList from '../../components/VirtualList';

let data: any = [];
for (let index = 0; index < 10000000; index++) {
  data.push(index);
}

export default defineComponent({
  components: { VirtualList },
  setup() {
    return {
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
.virtual-list-demo {
  display: flex;
  justify-content: center;
  width: 400px;

  &-item {
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
}
</style>
