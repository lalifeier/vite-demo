<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-card>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
        <!-- <v-toolbar-title>hi</v-toolbar-title> -->
        <v-spacer />
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
      <div class="text-center text-body-2 font-weight-bold secondary--text text--lighten-2">
        Admin Pro © All Rights Reserved
      </div>
    </v-footer>
  </div>

  <Backtop> </Backtop>
</template>
<script setup lang="ts">
  import Backtop from '/@/components/Backtop'

  import { ref } from 'vue'
  const drawer = ref(false)
  const miniVariant = ref(false)
</script>
