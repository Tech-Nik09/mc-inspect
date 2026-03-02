<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites';
import type { Favorite } from '@/types';

const favoritesStore = useFavoritesStore();

const props = defineProps<{
  id: Favorite['meta']['id'];
  type: Favorite['meta']['type'];
  data: Favorite['data'];
}>();
</script>

<template>
  <button @click="favoritesStore.toggleFavorite(props.id, props.type, props.data)">
    {{ favoritesStore.isFavorite(props.id) ? 'Remove from favorites' : 'Add to favorites' }}
  </button>
</template>

<style scoped></style>
