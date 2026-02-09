<script setup>
import { useRouter } from 'vue-router';
import { usePlayerStore } from '@/stores/player';
import { storeToRefs } from 'pinia';

const router = useRouter();

const playerStore = usePlayerStore();
const { isLoading, query } = storeToRefs(playerStore);

async function onQuery() {
  const newRoute = await playerStore.fetchPlayer();
  router.push(newRoute);
}
</script>

<template>
  <input type="text" :disabled="isLoading" v-model="query" @keyup.enter="onQuery" />
  <button :disabled="isLoading" @click="onQuery">{{ isLoading ? 'loading' : 'Search' }}</button>
</template>

<style scoped></style>
