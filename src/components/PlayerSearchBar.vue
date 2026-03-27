<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onStartTyping } from '@vueuse/core';

const router = useRouter();

const playerStore = usePlayerStore();
const { isLoading, query } = storeToRefs(playerStore);

const searchBar = useTemplateRef('searchBar');
onStartTyping(() => {
  searchBar.value?.focus();
});

async function onQuery(): Promise<void> {
  const newRoute = await playerStore.fetchPlayer();
  router.push(newRoute);
}
</script>

<template>
  <input type="text" :disabled="isLoading" @keyup.enter="onQuery" v-model="query" ref="searchBar" />
  <button :disabled="isLoading" @click="onQuery">{{ isLoading ? 'loading' : 'Search' }}</button>
</template>
