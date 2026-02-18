<script setup>
import { usePlayerStore } from '@/stores/player';
import { useFavoritesStore } from '@/stores/favorites';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';
import PlayerFavoriteCard from '@/components/PlayerFavoriteCard.vue';
import ToggleFavoriteButton from '@/components/ToggleFavoriteButton.vue';
import { storeToRefs } from 'pinia';

const playerStore = usePlayerStore();
const { isLoading, error } = storeToRefs(playerStore);

const favoritesStore = useFavoritesStore();
const { favoritePlayers } = storeToRefs(favoritesStore);
</script>

<template>
  <h1>Players</h1>
  <p>Placeholder text for player inspector.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <PlayerSearchBar />
  <p v-if="isLoading">Loading</p>
  <p v-else-if="error">{{ error }}</p>

  <div v-if="favoritePlayers.length">
    <div v-for="player in favoritePlayers" :key="player.meta.id">
      <PlayerFavoriteCard :data="player" />
      <ToggleFavoriteButton :id="player.meta.id" />
    </div>
  </div>
  <p v-else>There are no favorites yet.</p>
</template>

<style scoped></style>
