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
      color: #409eff;
      text-align: center;
      background: #ecf5ff;
      border-radius: 4px;
    }

    .flex-content {
      display: flex;

      .scrollbar-demo-item {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 50px;
        margin: 10px;
        color: #409eff;
        text-align: center;
        background: #ecf5ff;
        border-radius: 4px;
      }
    }
  }
</style>
