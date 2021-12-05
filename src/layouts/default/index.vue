<template>
  <div :class="[prefixCls, prefixCls + '-has-sider']">
    <layout-side-bar />

    <section :class="prefixCls">
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
  width: 100%;
  display: flex;
  flex-direction: column;
  &-has-sider {
    flex-direction: row;
  }
  &-main {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  &-header {
  }

  &-content {
    flex: 1;
    // padding: 20px;
  }
  &-footer {
  }
}
</style>
