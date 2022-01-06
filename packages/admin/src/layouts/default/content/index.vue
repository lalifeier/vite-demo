<template>
  <main :class="prefixCls">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';

const { prefixCls } = useDesign('layout-content');
</script>

<style lang="scss">
$prefix-cls: '#{$namespace}-content';

.#{$prefix-cls} {
}
</style>
