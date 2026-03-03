import { ref, toValue } from 'vue';
import { defineStore } from 'pinia';
import type { Player } from '@/types';

export const usePlayerStore = defineStore('player', () => {
  const isLoading = ref(false);
  const data = ref<Player | null>(null);
  const error = ref<string | null>(null);
  const query = ref('');

  function validateName(name: string): boolean {
    const nameCriteria = /^[a-zA-Z0-9_]{3,16}$/;
    return nameCriteria.test(name);
  }

  async function fetchPlayer() {
    let loadingTimeout: number | undefined;

    try {
      loadingTimeout = setTimeout(() => {
        isLoading.value = true;
      }, 200);

      query.value = query.value.trim();
      let name = toValue(query);

      if (!name) throw new Error('Playername cannot be empty');

      if (!validateName(name)) throw new Error(`Invalid player name "${name}"`);

      const headers: Record<string, string> = {};
      const apiKey: string = import.meta.env.VITE_API_KEY;
      if (apiKey) headers['X-API-Key'] = apiKey;

      const res = await fetch(`https://mc-inspect-api.tech-nik09.workers.dev/players/${name}`, {
        headers,
      });
      if (!res.ok) throw new Error(`Could not find player "${name}"`);

      const dat: Player = await res.json();
      data.value = dat;
      error.value = null;
      query.value = '';

      return { name: 'playerInfo', params: { playerName: dat.name } };
    } catch (err) {
      if (err instanceof Error) error.value = err.message;
      else error.value = 'Unknown error type';

      console.error(err);
      data.value = null;
      return { name: 'players' };
    } finally {
      clearTimeout(loadingTimeout);
      isLoading.value = false;
    }
  }

  return { isLoading, data, error, query, fetchPlayer };
});
