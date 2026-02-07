<script setup>
import { useRouter } from 'vue-router';
import { usePlayerStore } from '@/stores/player';

const router = useRouter();

const playerStore = usePlayerStore();

async function onQuery() {
  const newRoute = await playerStore.fetchPlayer();
  router.push(newRoute);
}
</script>

<template>
  <input type="text" :disabled="playerStore.isLoading" v-model="playerStore.query" @keyup.enter="onQuery" />
  <button :disabled="playerStore.isLoading" @click="onQuery">{{ playerStore.isLoading ? 'loading' : 'Search' }}</button>
</template>

<style scoped></style>
