<template>
  <div class="py-2 fill-height">
    <h1 class="text-h4">Dashboard</h1>
    <v-divider class="my-2"></v-divider>
    <v-row dense>
      <v-col v-for="i in 8" :key="i" cols="12" md="6" lg="3">
        <v-card class="pa-2 secondary--text overline">Example Content {{ i }}</v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
