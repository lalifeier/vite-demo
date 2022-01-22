<template>
  <AppProvider>
    <v-app>
      <RouterView />
    </v-app>
  </AppProvider>
</template>

<script setup lang="ts">
import { AppProvider } from '@/components/Application'
</script>

<style scoped></style>
