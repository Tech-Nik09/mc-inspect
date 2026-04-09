<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { useFavoritesStore } from '@/stores/favorites';
import SearchBar from '@/components/SearchBar.vue';
import PlayerFavoriteCard from '@/components/PlayerFavoriteCard.vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const playerStore = usePlayerStore();
const { isLoading, error, query } = storeToRefs(playerStore);

const favoritesStore = useFavoritesStore();
const { favoritePlayers } = storeToRefs(favoritesStore);

const router = useRouter();

async function onQuery(): Promise<void> {
  const newRoute = await playerStore.fetchPlayer();
  router.push(newRoute);
}
</script>

<template>
  <h1>Players</h1>

  <SearchBar @query="onQuery" :is-loading="isLoading" v-model="query" :placeholder="'Enter playername'" />
  <p v-if="error">{{ error }}</p>

  <template v-if="favoritePlayers.length">
    <div class="flex flex-col gap-2 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] sm:gap-4">
      <PlayerFavoriteCard v-for="favorite in favoritePlayers" :key="favorite.meta.id" :favorite />
    </div>
    <p>Current favorites: {{ favoritePlayers.length }}/10</p>
  </template>
  <p v-else>There are no favorites yet.</p>
</template>
