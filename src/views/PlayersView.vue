<script setup>
import { usePlayerQueryStore } from '@/stores/playerQuery';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();

const playerQuery = usePlayerQueryStore();
const { queryInput, queryError } = storeToRefs(playerQuery);
</script>

<template>
  <h1>Players</h1>
  <p>Placeholder text for player inspector.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <input type="text" v-model="queryInput" @keyup.enter="router.push({ name: 'playerInfo', params: { playerName: queryInput } })" />
  <p v-if="queryError">{{ queryError }}</p>
</template>

<style scoped></style>
