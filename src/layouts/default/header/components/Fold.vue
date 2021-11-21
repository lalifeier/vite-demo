<template>
  <v-app-bar-nav-icon @click.stop="toggleCollapse" />
</template>

<script setup lang="ts">import { ref } from 'vue';
const drawer = ref(true)

function toggleCollapse() {
  drawer.value = !drawer.value
}
</script>
