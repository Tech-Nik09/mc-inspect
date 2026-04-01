import { ref, toValue } from 'vue';
import { defineStore } from 'pinia';
import type { RouteLocationNamedRaw } from 'vue-router';
import type { Player } from '@/types';

export const usePlayerStore = defineStore('player', () => {
  const isLoading = ref(false);
  const data = ref<Player | null>(null);
  const error = ref<string | null>(null);
  const query = ref('');

  function validateQuery(nameOrUuid: string): boolean {
    const nameCriteria = /^[a-zA-Z0-9_]{3,16}$/;
    const uuidCriteria = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}|[0-9a-fA-F]{32})$/;
    return nameCriteria.test(nameOrUuid) || uuidCriteria.test(nameOrUuid);
  }

  function handleNameError(err: string): RouteLocationNamedRaw {
    error.value = err;
    data.value = null;
    return { name: 'players' };
  }

  async function fetchPlayer(): Promise<RouteLocationNamedRaw> {
    let loadingTimeout: number | undefined;

    try {
      loadingTimeout = setTimeout(() => {
        isLoading.value = true;
      }, 200);

      query.value = query.value.trim();
      let nameOrUuid = toValue(query);

      if (!nameOrUuid) return handleNameError('Playername cannot be empty');

      if (!validateQuery(nameOrUuid)) return handleNameError(`Invalid player name "${nameOrUuid}"`);

      const headers: Record<string, string> = {};
      const apiKey: string = import.meta.env.VITE_API_KEY;
      if (apiKey) headers['X-API-Key'] = apiKey;

      const res = await fetch(`https://mc-inspect-api.tech-nik09.workers.dev/players/${nameOrUuid}`, {
        headers,
      });
      if (!res.ok) return handleNameError(`Could not find player "${nameOrUuid}"`);

      const dat: Player = await res.json();
      data.value = dat;
      error.value = null;
      query.value = '';

      return { name: 'playerInfo', params: { playerQuery: dat.uuid } };
    } catch (err) {
      console.error(`Error while fetching player information: ${err}`);
      data.value = null;
      return { name: 'players' };
    } finally {
      clearTimeout(loadingTimeout);
      isLoading.value = false;
    }
  }

  return { isLoading, data, error, query, fetchPlayer };
});
