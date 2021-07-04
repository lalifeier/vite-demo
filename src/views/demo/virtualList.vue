<template>
  <div ref="list" class="infinite-list-container" @scroll="handleScroll($event)">
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        v-for="(item, index) in visibleData"
        :key="index"
        class="infinite-list-item"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'

const state: any = reactive({
  screenHeight: 0,
  startOffset: 0,
  startIndex: 0,
  endIndex: 0,
})

export default defineComponent({
  nmae: 'VirtualList',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    itemSize: {
      type: Number,
      default: 200,
    },
    bufferSize: {
      type: Number,
      default: 5,
    },
  },
  setup(props) {
    const list = ref(null)

    const listHeight = computed(() => props.data.length * props.itemSize)

    const visibleCount = computed(() => Math.ceil(state.screenHeight / props.itemSize) + props.bufferSize)

    const visibleData = computed(() => props.data.slice(state.startIndex, Math.min(state.endIndex, props.data.length)))

    const getTransform = computed(() => `translate3d(0,${state.startOffset}px,0)`)

    onMounted(() => {
      state.screenHeight = list.value.clientHeight
      updateVisibleData()
    })

    function updateVisibleData(scrollTop = 0) {
      state.startIndex = Math.floor(scrollTop / props.itemSize)
      state.endIndex = state.startIndex + visibleCount.value
      // state.startOffset = scrollTop - (scrollTop % props.itemSize)

      state.startOffset = state.startIndex * props.itemSize
    }

    function handleScroll(_event) {
      const scrollTop = list.value.scrollTop
      updateVisibleData(scrollTop)
    }

    return {
      handleScroll,
      ...toRefs(state),
      visibleData,
      listHeight,
      getTransform,
      list,
    }
  },
})
</script>

<style scoped>
.infinite-list-container {
  position: relative;
  height: 100%;
  overflow: auto;
}
.infinite-list-phantom {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
}
.infinite-list {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  text-align: center;
}
.infinite-list-item {
  box-sizing: border-box;
  padding: 10px;
  color: #555;
  border-bottom: 1px solid #999;
}
</style>
