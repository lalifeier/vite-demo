<template>
  <v-card class="tpa-1" color="transparent">
    <v-card-title class="justify-center text-h4 mb-2">Please verify the email</v-card-title>
    <v-card-subtitle class="justify-center">Please check your email for the link to verify the email.</v-card-subtitle>

    <v-card-actions>
      <v-btn color="primary" block size="x-large" @click="resend">Re-send email</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
function resend() {}
</script>

<style scoped></style>
