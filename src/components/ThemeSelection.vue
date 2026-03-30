<script setup lang="ts">
import type { FunctionalComponent } from 'vue';
import { useColorMode } from '@vueuse/core';
import MaterialSymbolsSunnyOutlineRounded from '~icons/material-symbols/sunny-outline-rounded';
import MaterialSymbolsMoonStarsOutlineRounded from '~icons/material-symbols/moon-stars-outline-rounded';
import MaterialSymbolsMonitorOutlineRounded from '~icons/material-symbols/monitor-outline-rounded';

type Theme = { id: string; icon: FunctionalComponent };

const themes: Theme[] = [
  { id: 'light', icon: MaterialSymbolsSunnyOutlineRounded },
  { id: 'dark', icon: MaterialSymbolsMoonStarsOutlineRounded },
  { id: 'auto', icon: MaterialSymbolsMonitorOutlineRounded },
] as const;

const { store } = useColorMode({
  storageKey: 'theme',
});
</script>

<template>
  <div class="grid h-8 w-20 grid-cols-[repeat(3,1.5rem)] rounded-full bg-slate-200 p-1 dark:bg-slate-800">
    <label
      v-for="theme in themes"
      :key="theme.id"
      class="flex cursor-pointer items-center justify-center rounded-full"
      :class="{ 'border border-slate-500 bg-slate-50 dark:border-slate-400 dark:bg-slate-600': theme.id === store }"
    >
      <input type="radio" :value="theme.id" v-model="store" class="hidden" />
      <component :is="theme.icon" class="size-4.5"></component>
    </label>
  </div>
</template>
