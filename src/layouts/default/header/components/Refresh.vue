<template>
  <v-btn icon @click="handleRefreshRoute">
    <v-icon icon="mdi-refresh"></v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useRedo } from '@/hooks/web/usePage';
const redo = useRedo();

async function handleRefreshRoute() {
  redo();
}

</script>
