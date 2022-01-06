<template>
  <v-list nav dense>
    <div v-for="(item, index) in props.menu" :key="index" :menu-item="item">
      <MenuItem :menu-item="item" small />
      <template v-if="item.children">
        <Menu :menu="item.children" />
      </template>
    </div>
  </v-list>
</template>
<script setup lang="ts">
import MenuItem from './MenuItem.vue';

const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});
</script>
