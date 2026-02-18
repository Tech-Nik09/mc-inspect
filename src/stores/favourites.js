import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useFavouritesStore = defineStore('favourites', () => {
  const favourites = ref(JSON.parse(localStorage.getItem('favourites')) || []);

  const favouritePlayers = computed(() => favourites.value.filter((e) => e.meta.type === 'player'));
  const favouriteServers = computed(() => favourites.value.filter((e) => e.meta.type === 'server'));

  watch(
    favourites,
    () => {
      localStorage.setItem('favourites', JSON.stringify(favourites.value));
    },
    { deep: true },
  );

  function isFavourite(id) {
    return favourites.value.some((e) => e.meta.id === id);
  }

  function toggleFavourite(id, type, data) {
    if (isFavourite(id)) {
      favourites.value = favourites.value.filter((e) => e.meta.id !== id);
    } else {
      favourites.value.push({ ...data, meta: { id, type } });
    }
  }

  return { favouritePlayers, favouriteServers, isFavourite, toggleFavourite };
});
