<template>
  <aside v-if="getCollapsed" :class="[prefixCls, prefixCls + '--light']">
    <div :class="prefixCls + '-children'">
      <Logo />

      <LayoutMenu />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useSidebarSetting } from '@/hooks/setting/useSidebarSetting';
import { useDesign } from '@/hooks/web/useDesign';
import LayoutMenu from '@/layouts/default/menu/index.vue';
import Logo from '@/layouts/default/sider/components/Logo.vue';

const { prefixCls } = useDesign('layout-sider');

const { getCollapsed } = useSidebarSetting();
</script>

<style lang="scss">
$prefix-cls: '#{$namespace}-layout-sider';

.#{$prefix-cls} {
  // flex: 0 0 256px;
  // max-width: 256px;
  // min-width: 256px;
  // width: 256px;
  // &-has-sider {
  // }
  // &--fixed {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   height: 100%;
  // }
}
</style>
