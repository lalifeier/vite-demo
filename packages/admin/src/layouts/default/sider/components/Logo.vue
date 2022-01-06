<template>
  <div :class="prefixCls">
    <a>
      <img src="/static/img/v-logo-small.png" alt="logo" />
      <h1>{{ title }}</h1>
    </a>
  </div>
</template>

<script setup lang="ts">
import { useGlobSetting } from '@/hooks/setting/useGlobSetting';
import { useDesign } from '@/hooks/web/useDesign';

const { prefixCls } = useDesign('layout-side-bar-logo');

const { title } = useGlobSetting();
</script>

<style lang="scss">
$prefix-cls: '#{$namespace}-layout-side-bar-logo';

.#{$prefix-cls} {
  height: 64px;
  padding: 16px;

  img {
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }

  h1 {
    display: inline-block;
    height: 32px;
    margin: 0 0 0 12px;
    color: #1890ff;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
  }
}
</style>
