<template>
  <!-- <div> -->

  <ProLayout v-model:collapsed="collapsed" :on-collapse="onCollapse">
    <template #logo>logo</template>
    <template #headerContent>headerContent</template>
    <template #headerExtra>
      <ProLayoutSiderTrigger></ProLayoutSiderTrigger>
    </template>

    <template #siderHeader>siderHeader</template>
    <template #siderContent>siderContent</template>
    <template #siderFooter>
      <ProLayoutSiderTrigger></ProLayoutSiderTrigger>
    </template>

    <router-view></router-view>

    <template #footer>footer</template>
  </ProLayout>

  <!-- <BackToTop /> -->
  <!-- </div> -->
</template>
<script setup lang="ts">
// import BackToTop from '@/components/BackToTop';
import { ProLayout, ProLayoutSiderTrigger } from '@/components/ProLayout'

const collapsed = ref(false)

const onCollapse = (collapsed: boolean) => {
  // console.log('onCollapse', collapsed);
}
</script>

<style lang="scss"></style>
