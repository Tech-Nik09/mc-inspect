<script setup lang="ts">
import { useColorMode, type BasicColorSchema } from '@vueuse/core';

const { store } = useColorMode();

const themes: BasicColorSchema[] = ['light', 'dark', 'auto'] as const;
</script>

<template>
  <div>
    <input type="radio" v-for="theme in themes" :key="theme" :value="theme" v-model="store" />
  </div>
</template>
