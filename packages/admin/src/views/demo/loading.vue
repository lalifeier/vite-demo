<template>
  <div loading-text="加载中...">
    <div ref="wrapEl">
      <v-alert text color="info">组件方式</v-alert>
      <v-btn color="primary" @click="openFullLoading">全屏 Loading</v-btn>

      <v-btn color="primary" @click="openWrapLoading">容器内 Loading</v-btn>

      <Loading :loading="loading" :text="text" :absolute="absolute"></Loading>
    </div>

    <div>
      <v-alert text color="info">函数方式</v-alert>
      <v-btn color="primary" @click="handleOpenFnFullLoading">全屏 Loading</v-btn>

      <v-btn color="primary" @click="handleOpenFnWrapLoading">容器内 Loading</v-btn>
    </div>

    <div>
      <v-alert text color="info">指令方式</v-alert>
      <v-btn v-loading="loadingRef" color="primary" @click="openDirectiveLoading">指令 Loading</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loading, useLoading } from '../../components/Loading'
import { ref, reactive, toRefs } from 'vue'

const loadingRef = ref(false)
const componentState = reactive({
  absolute: false,
  loading: false,
  text: '加载中...',
})

const fullLoading = useLoading({
  text: '加载中...',
})

const wrapEl = ref(null)

const absoluteLoading = useLoading({
  target: wrapEl,
  text: '加载中...',
  absolute: true,
})

function openLoading(absolute: boolean) {
  componentState.absolute = absolute
  componentState.loading = true
  setTimeout(() => {
    // componentState.loading = false
  }, 2000)
}

function openFullLoading() {
  openLoading(false)
}

function openWrapLoading() {
  openLoading(true)
}

function handleOpenFnFullLoading() {
  fullLoading.open()

  setTimeout(() => {
    fullLoading.close()
  }, 2000)
}

function handleOpenFnWrapLoading() {
  absoluteLoading.open()

  setTimeout(() => {
    absoluteLoading.close()
  }, 2000)
}

function openDirectiveLoading() {
  loadingRef.value = true
  setTimeout(() => {
    loadingRef.value = false
  }, 2000)
}

const { loading, text, absolute } = toRefs(componentState)
</script>

<style></style>
