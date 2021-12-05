<template>
  <div>
    <Scrollbar ref="scrollbar" :native="false" height="400px" @scroll="scroll">
      <div ref="inner">
        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
      </div>
    </Scrollbar>

    <Scrollbar>
      <div class="flex-content">
        <p v-for="item in 50" :key="item" class="scrollbar-demo-item">{{ item }}</p>
      </div>
    </Scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { Scrollbar } from '@/components/Scrollbar'

  function scroll(e) {
    // console.log(e)
  }
</script>

<style scoped>
  .vap-scrollbar {
    .scrollbar-demo-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      margin: 10px;
      text-align: center;
      border-radius: 4px;
      background: #ecf5ff;
      color: #409eff;
    }
    .flex-content {
      display: flex;

      .scrollbar-demo-item {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 50px;
        margin: 10px;
        text-align: center;
        border-radius: 4px;
        background: #ecf5ff;
        color: #409eff;
      }
    }
  }
</style>
