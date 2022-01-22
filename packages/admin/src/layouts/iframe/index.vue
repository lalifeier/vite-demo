<template>
  <div v-if="showFrame">
    <template v-for="frame in framePages" :key="frame.path">
      <Frame v-if="frame.meta?.frameSrc && hasRenderFrame(frame.name)" v-show="showIframe(frame)"></Frame>
    </template>
  </div>
</template>
<script setup lang="ts">
import uniqBy from 'lodash-es/uniqBy'
import { computed, toRaw, unref } from 'vue'
import { useRouter } from 'vue-router'
import Frame from '@/components/iframe'
import { AppRouteRecordRaw } from '@/router/types'

const router = useRouter()
const { currentRoute } = router

const showFrame = computed(() => unref(framePages).length > 0)

const framePages = computed(() => getFramePages(toRaw(router.getRoutes()) as unknown as AppRouteRecordRaw[]) || [])

function getFramePages(routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
  let res: AppRouteRecordRaw[] = []
  for (const route of routes) {
    const { meta: { frameSrc } = {}, children } = route
    if (frameSrc) {
      res.push(route)
    }
    if (children && children.length) {
      res.push(...getFramePages(children))
    }
  }
  res = uniqBy(res, 'name')
  return res
}

function showIframe(item: AppRouteRecordRaw) {
  return item.name === unref(currentRoute).name
}

function hasRenderFrame(_name: string) {
  return false
}
</script>
