<template>
  <div>
    <PageHeader></PageHeader>



    <!-- <markDown v-model="data" lang="ja_JP" theme="dark"></markDown> -->

    <MarkDown v-model="data" @init="handleInit"></MarkDown>

    <!-- <v-btn color="primary" @click="handleClick"></v-btn> -->

    <!-- <h2>{{ i18n.$t('hello_world') }}</h2> -->
    <!-- {{ t('common.light') }} -->

    <div>
      <SvgIcon class="kkkkkkkkkasdas asdffsa adfs" name="test" />333
    </div>

    <PageFooter>
      <template #left>2222</template>
      dasfd
      <template #right>33333333333</template>
    </PageFooter>
  </div>
</template>

<script setup lang="ts">
import { SvgIcon } from '@/components/Icon';
import MarkDown from '@/components/Markdown';
import { PageFooter, PageHeader } from '@/components/Page';
import scrollbar from '@/components/Scrollbar/src/scrollbar';
import { useI18nContext } from '@/context';
import { useI18n } from '@/hooks/web/useI18n';
// import { useI18n } from '@/plugins/lib/i18n';
import { ref } from 'vue';

function scroll(e) {
  // console.log(e);

}

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

<style scoped>
.el-scrollbar {
  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: #ecf5ff;
    color: #409eff;
  }
  .flex-content {
    display: flex;

    .scrollbar-demo-item {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 50px;
      margin: 10px;
      text-align: center;
      border-radius: 4px;
      background: #ecf5ff;
      color: #409eff;
    }
  }
}
</style>
