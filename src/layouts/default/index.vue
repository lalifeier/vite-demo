<template>
  <div :class="prefixCls">
    <layout-side-bar />

    <section :class="prefixCls + '-main'">
      <layout-header />

      <layout-app-main />

      <layout-footer />
    </section>
  </div>

  <BackToTop />
</template>
<script setup lang="ts">
import BackToTop from '@/components/BackToTop';
import { useDesign } from '@/hooks/web/useDesign';
import LayoutAppMain from '@/layouts/default/app-main/index.vue';
import LayoutFooter from '@/layouts/default/footer/index.vue';
import LayoutHeader from '@/layouts/default/header/index.vue';
import LayoutSideBar from '@/layouts/default/side-bar/index.vue';


const { prefixCls } = useDesign('layout');

</script>

<style lang="scss">
$prefix-cls: "#{$namespace}-layout";

.#{$prefix-cls} {
  display: flex;
  flex-direction: row;
  &-main {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  &-header {
  }

  &-app-main {
    flex: 1;
    // padding: 20px;
  }
  &-footer {
  }
}
</style>
