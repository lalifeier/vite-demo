<template>
  <!-- <div> -->
  <v-btn class="drawer-button" color="primary" @click="right = true">
    <v-icon class="fa-spin">mdi-cog-outline</v-icon>
  </v-btn>

  <v-navigation-drawer v-model="right" absolute permanent right width="310">
    <div class="d-flex align-center pa-2">
      <div class="title">设置</div>
      <v-spacer></v-spacer>
      <v-btn icon @click="right = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-divider></v-divider>

    <div class="pa-2">
      <div class="font-weight-bold my-1">系统主题</div>
      <v-btn-toggle v-model="theme.themeMode" color="primary" mandatory class="mb-2">
        <v-btn x-large value="light">Light</v-btn>
        <v-btn x-large value="dark">Dark</v-btn>
      </v-btn-toggle>

      <div class="font-weight-bold my-1">顶栏主题</div>
      <v-btn-toggle v-model="header.themeMode" color="primary" mandatory class="mb-2">
        <v-btn x-large>Global</v-btn>
        <v-btn x-large>Light</v-btn>
        <v-btn x-large>Dark</v-btn>
      </v-btn-toggle>

      <!-- <div class="font-weight-bold my-1">Toolbar Style</div>
      <v-btn-toggle v-model="toolbarStyle" color="primary" mandatory class="mb-2">
        <v-btn x-large>Full</v-btn>
        <v-btn x-large>Solo</v-btn>
      </v-btn-toggle>

      <div class="font-weight-bold my-1">Content Layout</div>
      <v-btn-toggle v-model="contentBoxed" color="primary" mandatory class="mb-2">
        <v-btn x-large>Fluid</v-btn>
        <v-btn x-large>Boxed</v-btn>
      </v-btn-toggle>-->

      <div class="font-weight-bold my-1">侧边栏主题</div>
      <v-btn-toggle v-model="sidebar.themeMode" color="primary" mandatory class="mb-2">
        <v-btn x-large>Global</v-btn>
        <v-btn x-large>Light</v-btn>
        <v-btn x-large>Dark</v-btn>
      </v-btn-toggle>

      <!-- <div class="font-weight-bold my-1">主题色</div> -->

      <!-- <v-color-picker v-model="theme.primaryColor" mode="hexa" :swatches="swatches" show-swatches></v-color-picker> -->
    </div>
  </v-navigation-drawer>

  <!-- </div> -->
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useAppStore } from '/@/store/modules/app'

  const right = ref(false)

  const appStore = useAppStore()
  const { theme, header, sidebar } = appStore.appConfig

  // const swatches = [
  //   ['#0096c7', '#31944f'],
  //   ['#EE4f12', '#46BBB1'],
  //   ['#ee44aa', '#55BB46']
  // ]
</script>

<style lang="scss" scoped>
  .drawer-button {
    position: fixed;
    top: 340px;
    right: -20px;
    z-index: 6;

    .v-icon {
      margin-left: -18px;
      font-size: 1.3rem;
    }
  }
</style>
