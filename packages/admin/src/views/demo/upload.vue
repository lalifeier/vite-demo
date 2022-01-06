import { ImportExcel } from '../../components/Excel/ImportExcel';
<template>
  <div>
    <Upload :before-upload="beforeUpload" @on-success="onSuccess($event)">
      <v-btn color="primary">上传</v-btn>
    </Upload>
  </div>
</template>

<script setup lang="ts">
import Upload from '@/components/Upload';

const onSuccess = (data) => {
  console.log(data);
};

function beforeUpload(_file: File) {
  return true;
}
</script>

<style scoped></style>
