<script setup>
import { useFavouritesStore } from '@/stores/favourites';

const favouritesStore = useFavouritesStore();

const props = defineProps(['id', 'type', 'data']);
</script>

<template>
  <button @click="favouritesStore.toggleFavourite(props.id, props.type, props.data)">
    {{ favouritesStore.isFavourite(props.id) ? 'Remove from favourites' : 'Add to favourites' }}
  </button>
</template>

<style scoped></style>
