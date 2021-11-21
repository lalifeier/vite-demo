<template>
  <div>
    <!-- <markDown v-model="data" lang="ja_JP" theme="dark"></markDown> -->

    <markDown v-model="data" @init="handleInit"></markDown>

    <v-btn color="primary" @click="handleClick"></v-btn>

    <!-- <h2>{{ i18n.$t('hello_world') }}</h2> -->
    {{ t('common.light') }}
  </div>
</template>

<script setup lang="ts">
import { markDown } from '@/components/Markdown';
import { useI18nContext } from '@/context';
import { useI18n } from '@/hooks/web/useI18n';
// import { useI18n } from '@/plugins/lib/i18n';
import { ref } from 'vue';

// const i18n = useI18n();
// const switchLanguage = () => {
//   const locale = i18n.locale.value === "en" ? "es" : "en";
//   i18n.locale.value = locale;
// };

const { t } = useI18n()


const data = ref('erwrew')

const i18n = useI18nContext()

function handleClick() {
  data.value = '456'

  i18n.setLocale(i18n.locale.value === 'en' ? 'zh-CN' : 'en')
}

function handleInit(e) {

}
</script>

<style></style>
