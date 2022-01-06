<template>
  <div class="d-flex text-center flex-column flex-grow-1">
    <div class="pa-2 pa-md-4 flex-grow-1 align-center justify-center d-flex flex-column">
      <div class="layout-content ma-auto w-full">
        <router-view></router-view>
      </div>
      <div class="text-overline mt-4">Admin PRO</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout-content {
  max-width: 480px;
}
</style>
