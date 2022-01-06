<template>
  <Result :title="title" :sub-title="subTitle">
    <template #icon>
      <img :src="icon" />
    </template>
    <template #extra>
      <v-btn color="primary" @click="handleClick">{{ btnText }}</v-btn>
    </template>
  </Result>
</template>

<script setup lang="ts">
import PRESENTED_IMAGE_403 from '@/assets/svg/403.svg';
import PRESENTED_IMAGE_404 from '@/assets/svg/404.svg';
import PRESENTED_IMAGE_500 from '@/assets/svg/500.svg';
import PRESENTED_IMAGE_NETWORK_ERROR from '@/assets/svg/network-error.svg';
import Result from '@/components/Result';
import { EXCEPTION_STATUS } from '@/enums/exception';
import { unref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  status: {
    type: Number,
    default: EXCEPTION_STATUS.NOT_FOUND,
  },
});

const router = useRouter();
console.log(unref(router.currentRoute));

const backHome = () => {
  router.push({
    name: 'Home',
  });
};
const refershPage = () => {
  router.push({
    name: 'Refresh',
  });
};

const exceptionMap = {
  [EXCEPTION_STATUS.NOT_ACCESS]: {
    title: '403',
    subTitle: '无权访问此页面',
    icon: PRESENTED_IMAGE_403,
    btnText: '返回首页',
    handleClick: backHome,
  },
  [EXCEPTION_STATUS.NOT_FOUND]: {
    title: '404',
    subTitle: '访问的页面不存在',
    icon: PRESENTED_IMAGE_404,
    btnText: '返回首页',
    handleClick: backHome,
  },
  [EXCEPTION_STATUS.ERROR]: {
    title: '500',
    subTitle: '服务器内部错误',
    icon: PRESENTED_IMAGE_500,
    btnText: '返回首页',
    handleClick: backHome,
  },
  [EXCEPTION_STATUS.NETWORK_ERROR]: {
    title: '网络错误',
    subTitle: '网络连接已断开，请检查您的网络',
    icon: PRESENTED_IMAGE_NETWORK_ERROR,
    btnText: '刷新',
    handleClick: refershPage,
  },
};

const { title, subTitle, icon, btnText, handleClick } = exceptionMap[props.status];
</script>

<style lang="scss" scoped></style>
