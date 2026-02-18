<script setup>
import { useFavoritesStore } from '@/stores/favorites';

const favoritesStore = useFavoritesStore();

const props = defineProps(['id', 'type', 'data']);
</script>

<template>
  <button @click="favoritesStore.toggleFavorite(props.id, props.type, props.data)">
    {{ favoritesStore.isFavorite(props.id) ? 'Remove from favorites' : 'Add to favorites' }}
  </button>
</template>

<style scoped></style>
