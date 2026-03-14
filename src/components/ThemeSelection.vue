<script setup lang="ts">
import { ref, watch } from 'vue';
import MaterialSymbolsLightModeOutlineRounded from '~icons/material-symbols/light-mode-outline-rounded';
import MaterialSymbolsMoonStarsOutlineRounded from '~icons/material-symbols/moon-stars-outline-rounded';
import MaterialSymbolsMonitorOutlineRounded from '~icons/material-symbols/monitor-outline-rounded';

const themes = ['light', 'dark', 'auto'] as const;
type Theme = (typeof themes)[number];

function isTheme(theme: any): theme is Theme {
  return themes.includes(theme);
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

function isCurrentTheme(currentTheme: Theme): boolean {
  return currentTheme === theme.value;
}
</script>

<template>
  <div class="theme-selection">
    <label :class="{ active: isCurrentTheme('auto') }">
      <input type="radio" value="auto" v-model="theme" />
      <MaterialSymbolsMonitorOutlineRounded class="icon" />
    </label>

    <label :class="{ active: isCurrentTheme('light') }">
      <input type="radio" value="light" v-model="theme" />
      <MaterialSymbolsLightModeOutlineRounded class="icon" />
    </label>

    <label :class="{ active: isCurrentTheme('dark') }">
      <input type="radio" value="dark" v-model="theme" />
      <MaterialSymbolsMoonStarsOutlineRounded class="icon" />
    </label>
  </div>
</template>

<style scoped>
.theme-selection {
  --theme-selection-size: 2.5rem;
}

.theme-selection {
  height: var(--theme-selection-size);

  display: grid;
  grid-template-columns: repeat(3, var(--theme-selection-size));
  justify-content: center;
  align-items: center;

  border-radius: 100vmax;
  background-color: var(--secondary-background-color);

  transition: background-color var(--theme-transition);
}

.theme-selection input {
  display: none;
}

.theme-selection label {
  margin: 10%;
  padding: 6px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 100vmax;
}

.theme-selection label.active {
  padding: 4px;

  background-color: var(--primary-radio-color);
  border: 2px solid var(--primary-border-color);
}

.icon {
  width: 100%;
  height: 100%;

  color: var(--primary-font-color);
}
</style>
