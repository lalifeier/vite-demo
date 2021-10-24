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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

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

      <toolbar-notifications />

      <toolbar-user />
    </template>
  </v-app-bar>

  <v-main>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <div class="my-1">
      Copyright © 2021
      <router-link to="#" class="text-decoration-none">Admin Pro</router-link>, All rights Reserved
    </div>
  </v-footer>

  <BackToTop />

  <Setting />
</template>
<script setup lang="ts">
  import BackToTop from '@/components/BackToTop'
  import Menu from '@/layouts/default/menu/index.vue'
  import { ref } from 'vue'
  import Setting from './setting/index.vue'
  import ToolbarNotifications from './toolbar/ToolbarNotifications.vue'
  import ToolbarUser from './toolbar/ToolbarUser.vue'

  const drawer = ref(true)

  const showSearch = ref(false)
  // const miniVariant = ref(false)
</script>
