<script setup>
import { usePlayersStore } from '@/stores/players';
import { useRouter } from 'vue-router';

const router = useRouter();

const player = usePlayersStore();
</script>

<template>
  <h1>Players</h1>
  <p>Placeholder text for player inspector.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <input type="text" v-model="player.playerName" @keyup.enter="router.push({ name: 'playerInfo', params: { playerName: player.playerName } })" />
</template>

<style scoped></style>
