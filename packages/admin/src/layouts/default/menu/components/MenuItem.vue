<template>
  <v-list-item
    v-if="!menuItem.children"
    :input-value="menuItem.value"
    :to="menuItem.link"
    :exact="menuItem.exact"
    :disabled="menuItem.disabled"
    exact-active-class="primary--text"
  >
    <v-list-item-icon>
      <v-icon :small="small" :class="{ 'grey--text': menuItem.disabled }">{{
        menuItem.icon || 'mdi-circle-medium'
      }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ menuItem.text }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>

  <v-list-group
    v-else
    :value="menuItem.regex ? menuItem.regex.test($route.path) : false"
    :disabled="menuItem.disabled"
    :sub-group="subgroup"
    :to="menuItem.link"
  >
    <template #activator>
      <v-list-item-icon v-if="!subgroup">
        <v-icon :small="small">{{ menuItem.icon || 'mdi-circle-medium' }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ menuItem.text }}</v-list-item-title>
      </v-list-item-content>
    </template>
  </v-list-group>
</template>
<script setup lang="ts">
const props = defineProps({
  menuItem: {
    type: Object,
    default: () => {},
  },
  small: {
    type: Boolean,
    default: false,
  },
  subgroup: {
    type: Boolean,
    default: false,
  },
});
defineExpose({
  props,
});
</script>
