<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';

const themes = ['light', 'dark', 'auto'] as const;
type Theme = (typeof themes)[number];

function isTheme(theme: any): theme is Theme {
  return themes.includes(theme);
}

const savedTheme = localStorage.getItem('theme');
const theme = ref<Theme>(isTheme(savedTheme) ? savedTheme : 'auto');

const preferredThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const prefersDark = ref<boolean>(preferredThemeQuery.matches);
function changePreferrsDark(event: MediaQueryListEvent): void {
  prefersDark.value = event.matches;
}
onMounted(() => preferredThemeQuery.addEventListener('change', changePreferrsDark));
onUnmounted(() => preferredThemeQuery.removeEventListener('change', changePreferrsDark));

watch(
  [theme, prefersDark],
  () => {
    document.documentElement.classList.toggle('dark', theme.value === 'dark' || (theme.value === 'auto' && prefersDark.value));
    localStorage.setItem('theme', theme.value);
  },
  { immediate: true },
);
</script>

<template>
  <input v-for="option in themes" :key="option" type="radio" :value="option" v-model="theme" />

  <p>Theme: {{ theme }}</p>
</template>
