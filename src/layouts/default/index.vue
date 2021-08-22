<template>
  <v-navigation-drawer v-model="drawer" app>
    <template #prepend>
      <div class="d-flex pa-2 align-center">
        <img src="/static/img/v-logo-small.png" width="48" height="48" alt="logo" class="mr-1" />
        <div>
          <div class="font-weight-bold text-uppercase text-primary">VC Admin Pro</div>
          <div class="text-overline text-grey">V0.0.1</div>
        </div>
      </div>
      <v-divider class="mb-1"></v-divider>
    </template>

    <Menu></Menu>

    <template #append>
      <div class="pa-2 text-center">
        <v-btn to="#" block color="secondary">Documentation</v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

    <v-spacer />

    <!-- <v-text-field
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

    <v-spacer class="d-block d-sm-none"></v-spacer>-->

    <v-btn class="d-block d-sm-none" icon @click="showSearch = true">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>-->

    <!-- <v-toolbar-title>hi</v-toolbar-title> -->

    <toolbar-notifications />
    <toolbar-user />
  </v-app-bar>

  <v-main>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <div class="d-flex flex-column align-center">
      <div class="my-1">
        Copyright © 2020
        <router-link to="#" class="text-decoration-none">Admin Pro</router-link>, All rights
        Reserved
      </div>
    </div>
  </v-footer>

  <Backtop />
  <Setting />
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import Setting from './setting/index.vue'
  import ToolbarNotifications from './toolbar/ToolbarNotifications.vue'
  import ToolbarUser from './toolbar/ToolbarUser.vue'
  import Backtop from '/@/components/Backtop'
  import Menu from '/@/layouts/default/menu/index.vue'

  const drawer = ref(true)

  const showSearch = ref(true)
  // const miniVariant = ref(false)
</script>
