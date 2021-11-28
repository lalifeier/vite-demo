<template>
  <!-- <v-main>
    <v-container>
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-container>
  </v-main>-->

  <main :class="prefixCls">
    <router-view></router-view>
  </main>
</template>


<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';

const { prefixCls } = useDesign('layout-app-main');

</script>

<style lang="scss">
$prefix-cls: "#{$namespace}-app-main";

.#{$prefix-cls} {
}
</style>
