import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || []);

  const favoritePlayers = computed(() => favorites.value.filter((e) => e.meta.type === 'player'));
  const favoriteServers = computed(() => favorites.value.filter((e) => e.meta.type === 'server'));

  watch(
    favorites,
    () => {
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    },
    { deep: true },
  );

  function isFavorite(id) {
    return favorites.value.some((e) => e.meta.id === id);
  }

  function toggleFavorite(id, type, data) {
    if (isFavorite(id)) {
      favorites.value = favorites.value.filter((e) => e.meta.id !== id);
    } else {
      favorites.value.push({ ...data, meta: { id, type } });
    }
  }

  return { favoritePlayers, favoriteServers, isFavorite, toggleFavorite };
});
