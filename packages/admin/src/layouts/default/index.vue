<template>
  <ProLayout>
    <template #logo>logo</template>
    <template #headerContent>headerContent</template>
    <template #headerExtra>headerExtra</template>

    <template #siderHeader>siderHeader</template>
    <template #siderContent>siderContent</template>
    <template #siderFooter>siderFooter</template>

    <router-view></router-view>

    <template #footer>footer</template>
  </ProLayout>

  <BackToTop />
</template>
<script setup lang="ts">
  import BackToTop from '@/components/BackToTop'
  import ProLayout from '@/components/ProLayout'
  import { useDesign } from '@/hooks/web/useDesign'

  const { prefixCls } = useDesign('layout')
</script>

<style lang="scss">
  // $prefix-cls: "#{$namespace}-layout";

  // .#{$prefix-cls} {
  //   display: flex;
  //   flex-direction: column;
  //   width: 100%;
  //   min-height: 100%;
  //   &-sider {
  //     width: 208px;
  //     position: relative;
  //     &-fixed {
  //       position: fixed;
  //       top: 0;
  //       left: 0;
  //       // z-index: 100;
  //     }
  //     &-children {
  //       display: flex;
  //       flex-direction: column;
  //       height: 100%;
  //     }
  //     &--light {
  //       background-color: #fff;
  //     }
  //     &--dark {
  //       background-color: #001529;
  //     }
  //   }
  //   &-has-sider {
  //     flex-direction: row;
  //   }
  //   &-header {
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-between;
  //     height: 48px;
  //     line-height: 48px;
  //     background: #fff;
  //     &-fixed {
  //       position: fixed;
  //       top: 0;
  //       left: 0;
  //     }
  //   }
  //   &-content {
  //     flex: 1;
  //   }
  //   &-footer {
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     height: 40px;
  //     background-color: #fff;
  //   }
  // }
</style>
