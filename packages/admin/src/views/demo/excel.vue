import { ImportExcel } from '../../components/Excel/ImportExcel';
<template>
  <div>
    <ImportExcel :before-upload="beforeUpload" @on-success="onSuccess($event)">
      <v-btn color="primary">导入Excel</v-btn>
    </ImportExcel>
  </div>
</template>

<script setup lang="ts">
import { ExcelData } from '@/utils/excel/types'
import { ImportExcel } from '../../components/Excel'

const onSuccess = (data: ExcelData[]) => {
  console.log(data)
}

function beforeUpload(file: File) {
  console.log(file)
  const isLt1M = file.size / 1024 / 1024 < 1
  if (isLt1M) {
    return true
  }
  return false
}
</script>

<style scoped></style>
