<script setup lang="ts">
import { ref, watch } from 'vue';

const theme = ref(localStorage.getItem('theme') || 'auto');

watch(
  theme,
  () => {
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem('theme', theme.value);
  },
  { immediate: true },
);
</script>

<template>
  <input type="radio" value="auto" v-model="theme" />
  <input type="radio" value="light" v-model="theme" />
  <input type="radio" value="dark" v-model="theme" />

  <p>Theme: {{ theme }}</p>
</template>

<style scoped></style>
