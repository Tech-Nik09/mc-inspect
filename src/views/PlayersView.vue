<script setup>
import { usePlayerStore } from '@/stores/player';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';
import { storeToRefs } from 'pinia';

const playerStore = usePlayerStore();
const { isLoading, error } = storeToRefs(playerStore);
</script>

<template>
  <h1>Players</h1>
  <p>Placeholder text for player inspector.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <PlayerSearchBar />
  <p v-if="isLoading">Loading</p>
  <p v-else-if="error">{{ error }}</p>
</template>

<style scoped></style>
