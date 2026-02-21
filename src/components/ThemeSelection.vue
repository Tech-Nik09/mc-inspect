<script setup>
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
  <select v-model="theme">
    <option value="auto">automatic</option>
    <option value="light">light</option>
    <option value="dark">dark</option>
    <option value="oled">oled</option>
  </select>

  <p>Theme: {{ theme }}</p>
</template>

<style scoped></style>
