<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { useFavoritesStore } from '@/stores/favorites';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';
import PlayerFavoriteCard from '@/components/PlayerFavoriteCard.vue';
import { storeToRefs } from 'pinia';

const playerStore = usePlayerStore();
const { error } = storeToRefs(playerStore);

const favoritesStore = useFavoritesStore();
const { favoritePlayers } = storeToRefs(favoritesStore);
</script>

<template>
  <h1>Players</h1>

  <PlayerSearchBar />
  <p v-if="error">{{ error }}</p>

  <div v-if="favoritePlayers.length">
    <div v-for="favorite in favoritePlayers" :key="favorite.meta.id">
      <PlayerFavoriteCard :favorite="favorite" />
    </div>
    <p>Current favorites: {{ favoritePlayers.length }}/10</p>
  </div>
  <p v-else>There are no favorites yet.</p>
</template>
