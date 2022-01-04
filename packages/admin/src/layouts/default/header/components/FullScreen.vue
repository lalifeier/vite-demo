<template>
  <v-btn icon @click="toggle">
    <v-icon v-if="!isFullscreen" icon="mdi-fullscreen"></v-icon>
    <v-icon v-else icon="mdi-fullscreen-exit"></v-icon>
  </v-btn>
</template>

<script setup lang="ts">
  import { useFullscreen } from '@vueuse/core'

  const { isFullscreen, toggle } = useFullscreen()
</script>
