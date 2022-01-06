<template>
  <div>
    <Tinymce
      v-model="description"
      :plugins="['link image media table lists fullscreen quickbars charactercount']"
      :disabled="disabled"
      :options="options"
      @change="handleTinymceChange"
    ></Tinymce>

    <!-- <Tinymce v-model="description" @change="handleTinymceChange" disabled></Tinymce> -->

    <v-btn color="primary" @click="handleClick"></v-btn>
  </div>
</template>

<script setup lang="ts">
import Tinymce from '@/components/Tinymce';
import { ref, unref } from 'vue';

const description = ref('123');

const disabled = ref(false);
const skin = ref('oxide-dark');
function handleTinymceChange() {}

function handleClick() {
  description.value = 'qeeeeeeeeeeeeee';

  disabled.value = !unref(disabled);

  skin.value = 'oxide-dark';
}

const options = {
  ax_wordlimit_num: 40,
  ax_wordlimit_callback: function (editor, txt, num) {
    console.log('当前字数：' + txt.length + '，限制字数：' + num);
  },
  characterlimit_min: 5,
  characterlimit_max: 10,
  charwordcount_include_tags: false,
};
</script>

<style>
/* Optional: Adjust the positioning of the character count text. */
label.mce-charactercount {
  margin: 2px 0 2px 2px;
  padding: 8px;
}

/* Optional: Remove the html path code from the status bar. */
.mce-path {
  display: none !important;
}
</style>
