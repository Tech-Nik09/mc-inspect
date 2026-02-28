<script setup lang="ts">
import { ref, watch } from 'vue';

const themes = ['light', 'dark', 'auto'] as const;
type Theme = (typeof themes)[number];

function isTheme(val: any): val is Theme {
  return themes.includes(val);
}

const savedTheme = localStorage.getItem('theme');
const theme = ref<Theme>(isTheme(savedTheme) ? savedTheme : 'auto');

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
  <input v-for="item in themes" :key="item" type="radio" :value="item" v-model="theme" />

  <p>Theme: {{ theme }}</p>
</template>

<style scoped></style>
