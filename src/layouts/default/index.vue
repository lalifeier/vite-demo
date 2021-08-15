<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-card class="flex-grow-1 d-flex mt-3" color="surface">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>

        <!-- <v-toolbar-title>hi</v-toolbar-title> -->
        <!-- <v-spacer /> -->
      </v-card>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height">
        <!-- <v-layout> -->
        <router-view></router-view>
        <!-- </v-layout> -->
      </v-container>
    </v-main>

    <v-footer app>
      <v-container>
        <div class="d-flex flex-column align-center">
          <div class="my-1 secondary--text">
            Copyright © 2020
            <router-link to="#" class="text-decoration-none secondary--text text--lighten-3"
              >Admin Pro</router-link
            >, All rights Reserved
          </div>
        </div>
      </v-container>
    </v-footer>
  </div>

  <Backtop> </Backtop>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import Backtop from '/@/components/Backtop'

  const drawer = ref(false)
  const miniVariant = ref(false)
</script>
