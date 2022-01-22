<template>
  <header :class="prefixCls">
    <div :class="prefixCls + '-left'">
      <Trigger />
    </div>

    <div :class="prefixCls + '-right'">
      <Notice />

      <FullScreen />

      <Language />

      <Refresh />

      <Avatar />

      <Setting />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'
import Avatar from '@/layouts/default/header/components/Avatar.vue'
import FullScreen from '@/layouts/default/header/components/FullScreen.vue'
import Language from '@/layouts/default/header/components/Language.vue'
import Notice from '@/layouts/default/header/components/Notice.vue'
import Refresh from '@/layouts/default/header/components/Refresh.vue'
import Trigger from '@/layouts/default/header/components/Trigger.vue'
import Setting from '@/layouts/default/setting/index.vue'
import { ref } from 'vue'
const showSearch = ref(false)

const { prefixCls } = useDesign('layout-header')
</script>

<style lang="scss">
$prefix-cls: '#{$namespace}-layout-header';

.#{$prefix-cls} {
  &--fixed {
    position: fixed;
    top: 0;
  }
}
</style>
