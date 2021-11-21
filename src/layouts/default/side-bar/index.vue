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

  <div :class="prefixCls">
    <Logo />

    <Menu />
  </div>
</template>


<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';
import Menu from '@/layouts/default/menu/index.vue';
import Logo from '@/layouts/default/side-bar/components/Logo.vue';



// const drawer = ref(true)


const { prefixCls } = useDesign('layout-side-bar');


</script>

<style lang="scss">
$prefix-cls: "#{$namespace}-layout-side-bar";

.#{$prefix-cls} {
  width: 208px;
  height: 100vh;
  background: #fff;
}
</style>
