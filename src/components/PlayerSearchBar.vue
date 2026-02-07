<script setup>
import { useRouter } from 'vue-router';
import { usePlayerStore } from '@/stores/player';

const router = useRouter();

const store = usePlayerStore();

async function onQuery() {
  await store.fetchPlayer();

  if (store.error) {
    router.push({ name: 'players' });
  } else {
    router.push({ name: 'playerInfo', params: { playerName: store.data.name } });
  }
}
</script>

<template>
  <input type="text" :disabled="store.isLoading" v-model="store.query" @keyup.enter="onQuery" />
  <button :disabled="store.isLoading" @click="onQuery">{{ store.isLoading ? 'loading' : 'Search' }}</button>
</template>

<style scoped></style>
