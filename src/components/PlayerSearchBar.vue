<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { nextTick, onMounted, useTemplateRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();

const playerStore = usePlayerStore();
const { isLoading, query } = storeToRefs(playerStore);

const searchBar = useTemplateRef('searchBar');

async function onQuery(): Promise<void> {
  const newRoute = await playerStore.fetchPlayer();
  router.push(newRoute);
}

function focusInput(): void {
  nextTick(() => {
    if (!isLoading.value) searchBar.value?.focus();
  });
}
onMounted(() => {
  focusInput();
});

watch(isLoading, (loading) => {
  if (!loading) focusInput();
});
</script>

<template>
  <input type="text" :disabled="isLoading" @keyup.enter="onQuery" v-model="query" ref="searchBar" />
  <button :disabled="isLoading" @click="onQuery">{{ isLoading ? 'loading' : 'Search' }}</button>
</template>

<style scoped></style>
