<template>
  <!-- <v-app-bar app>
    <v-text-field
      v-if="showSearch"
      append-icon="mdi-close"
      placeholder="Search"
      prepend-inner-icon="mdi-magnify"
      hide-details
      outlined
      solo
      flat
      autofocus
      @click:append="showSearch = false"
    ></v-text-field>

    <template v-else>
      <Fold />

      <v-spacer />

      <v-text-field
        ref="search"
        class="hidden-xs-only mx-2"
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        hide-details
        filled
        dense
        style="max-width: 600px"
        rounded
      ></v-text-field>

      <v-spacer class="d-block d-sm-none"></v-spacer>

      <v-btn class="d-block d-sm-none" icon @click="showSearch = true">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <Notice />

      <FullScreen />

      <Language />

      <Refresh />

      <Avatar />

      <Setting />
    </template>
  </v-app-bar>-->

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
  import Trigger from '@/layouts/default/header/components/Trigger.vue'
  import FullScreen from '@/layouts/default/header/components/FullScreen.vue'
  import Language from '@/layouts/default/header/components/Language.vue'
  import Notice from '@/layouts/default/header/components/Notice.vue'
  import Refresh from '@/layouts/default/header/components/Refresh.vue'
  import Setting from '@/layouts/default/setting/index.vue'
  import { ref } from 'vue'
  const showSearch = ref(false)

  const { prefixCls } = useDesign('layout-header')
</script>

<style lang="scss">
  $prefix-cls: '#{$namespace}-layout-header';

  .#{$prefix-cls} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    line-height: 48px;
    background: #fff;
    &-left {
    }
    &-right {
    }
    &--fixed {
      position: fixed;
      top: 0;
    }
  }
</style>
