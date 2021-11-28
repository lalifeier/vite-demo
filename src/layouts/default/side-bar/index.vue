<template>
  <!-- <v-navigation-drawer v-model="drawer" app>
    <template #prepend>
      <Logo />
      <v-divider class="mb-1"></v-divider>
    </template>

    <Menu></Menu>

    <template #append>
      <div class="pa-2 text-center">
        <v-btn to="#" block color="secondary">Documentation</v-btn>
      </div>
    </template>
  </v-navigation-drawer>-->

  <aside :class="prefixCls" v-if="getCollapsed">
    <Logo />

    <Menu />
  </aside>
</template>


<script setup lang="ts">
import { useSidebarSetting } from '@/hooks/setting/useSidebarSetting';
import { useDesign } from '@/hooks/web/useDesign';
import Menu from '@/layouts/default/menu/index.vue';
import Logo from '@/layouts/default/side-bar/components/Logo.vue';

const { prefixCls } = useDesign('layout-side-bar');

const { getCollapsed } = useSidebarSetting()


</script>

<style lang="scss">
$prefix-cls: "#{$namespace}-layout-side-bar";

.#{$prefix-cls} {
  width: 208px;
  height: 100vh;
  background: #fff;
  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }
}
</style>
