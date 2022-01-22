<template>
  <v-btn icon @click="toggleCollapsed">
    <v-icon icon="mdi-menu"></v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useSidebarSetting } from '@/hooks/setting/useSidebarSetting'

const { toggleCollapsed } = useSidebarSetting()
</script>
