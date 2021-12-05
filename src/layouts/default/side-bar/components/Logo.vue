<template>
  <!-- <div class="d-flex pa-2 align-center">
    <img src="/static/img/v-logo-small.png" width="48" height="48" alt="logo" class="mr-1" />
    <div>
      <div class="font-weight-bold text-uppercase text-primary">{{ VITE_APP_TITLE }}</div>
    </div>
  </div>-->

  <div :class="prefixCls">
    <a>
      <img src="/static/img/v-logo-small.png" alt="logo" />
      <h1>{{ title }}</h1>
    </a>
  </div>
</template>

<script setup lang="ts">
  import { useDesign } from '@/hooks/web/useDesign'
  import { useGlobConfig } from '@/utils/env'

  const { prefixCls } = useDesign('layout-side-bar-logo')

  const { title } = useGlobConfig()
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-layout-side-bar-logo';

  .#{$prefix-cls} {
    padding: 16px;
    height: 64px;
    img {
      display: inline-block;
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
    h1 {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      margin: 0 0 0 12px;
      font-weight: 600;
      font-size: 18px;
      color: #1890ff;
    }
  }
</style>
