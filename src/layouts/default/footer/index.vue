<template>
  <!-- <v-footer app>
    <div class="my-1">
      Copyright
      <v-icon>mdi-copyright</v-icon>
      {{ fullYear }}
      <router-link to="#" class="text-decoration-none">{{ VITE_APP_TITLE }}</router-link>, All rights Reserved
    </div>
  </v-footer>-->

  <div :class="prefixCls">
    Copyright
    <v-icon>mdi-copyright</v-icon>
    {{ fullYear }}
    <router-link to="#" class="text-decoration-none">{{ title }}</router-link>, All rights Reserved
  </div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';
import { useGlobConfig } from '@/utils/env';


const { title } = useGlobConfig()
const fullYear = new Date().getFullYear()


const { prefixCls } = useDesign('layout-footer');

</script>

<style lang="scss">
$prefix-cls: "#{$namespace}-layout-footer";

.#{$prefix-cls} {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 55px;
  padding: 0 20 px 0 20 px;
  background-color: #fff;
}
</style>
