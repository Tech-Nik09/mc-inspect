<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();

const playerStore = usePlayerStore();
const { isLoading, query } = storeToRefs(playerStore);

async function onSearch(): Promise<void> {
  const newRoute = await playerStore.fetchPlayer();
  router.push(newRoute);
}
</script>

<template>
  <input type="text" :disabled="isLoading" v-model="query" @keyup.enter="onSearch" />
  <button :disabled="isLoading" @click="onSearch">{{ isLoading ? 'loading' : 'Search' }}</button>
</template>

<style scoped></style>
