import { ref, toValue } from 'vue';
import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', () => {
  const isLoading = ref(false);
  const data = ref(null);
  const error = ref(null);
  const query = ref('');

  function validateName(name) {
    const nameCriteria = /^[a-zA-Z0-9_]{3,16}$/;
    return nameCriteria.test(name);
  }

  async function fetchPlayer() {
    query.value = query.value.trim();
    let name = toValue(query);
    let isLoadingTimeout;

    try {
      if (!name) {
        throw new Error('Playername cannot be empty');
      }

      if (!validateName(name)) {
        throw new Error(`Invalid player name "${name}"`);
      }

      isLoadingTimeout = setTimeout(() => {
        isLoading.value = true;
      }, 200);

      const res = await fetch(`https://mc-inspect-api.tech-nik09.workers.dev/players/${name}`);
      if (!res.ok) {
        throw new Error(`Could not find player "${name}"`);
      }

      data.value = await res.json();
      error.value = null;
      query.value = '';

      return { name: 'playerInfo', params: { playerName: data.value.name } };
    } catch (err) {
      console.error(err);

      data.value = null;
      error.value = err;

      return { name: 'players' };
    } finally {
      clearTimeout(isLoadingTimeout);
      isLoading.value = false;
    }
  }

  return { isLoading, data, error, query, fetchPlayer };
});
