<script setup>
import { useCurrentPlayerStore } from '@/stores/currentPlayer';
import { useRouter } from 'vue-router';

const router = useRouter();

const currentPlayer = useCurrentPlayerStore();
</script>

<template>
  <h1>Players</h1>
  <p>Placeholder text for player inspector.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <input
    type="text"
    v-model="currentPlayer.playerName"
    @keyup.enter="router.push({ name: 'playerInfo', params: { playerName: currentPlayer.playerName } })"
  />
  <p v-if="currentPlayer.playerError">Error: {{ currentPlayer.playerError }}</p>
</template>

<style scoped></style>
