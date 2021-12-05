<template>
  <div>
    <Tinymce v-model="description" :disabled="disabled" @change="handleTinymceChange"></Tinymce>

    <!-- <Tinymce v-model="description" @change="handleTinymceChange" disabled></Tinymce> -->

    <v-btn color="primary" @click="handleClick"></v-btn>
  </div>
</template>

<script setup lang="ts">
  import  Tinymce  from '@/components/Tinymce'
  import { ref, unref } from 'vue'

  const description = ref('123')

  const disabled = ref(false)
  const skin = ref('oxide-dark')
  function handleTinymceChange() {}

  function handleClick() {
    description.value = 'qeeeeeeeeeeeeee'

    disabled.value = !unref(disabled)

    skin.value = 'oxide-dark'
  }
</script>

<style></style>
