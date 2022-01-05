<template>
  <footer :class="prefixCls">
    Copyright
    <v-icon>mdi-copyright</v-icon>
    {{ fullYear }}
    <router-link to="#" class="text-decoration-none">{{ title }}</router-link
    >, All rights Reserved
  </footer>
</template>

<script setup lang="ts">
  import { useGlobSetting } from '@/hooks/setting/useGlobSetting'
  import { useDesign } from '@/hooks/web/useDesign'

  const { title } = useGlobSetting()
  const fullYear = new Date().getFullYear()

  const { prefixCls } = useDesign('layout-footer')
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-layout-footer';

  .#{$prefix-cls} {
  }
</style>
