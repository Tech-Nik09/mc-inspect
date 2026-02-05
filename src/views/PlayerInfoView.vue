<script setup>
import { usePlayerQueryStore } from '@/stores/playerQuery';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const playerQuery = usePlayerQueryStore();
const { queryInput, queryError } = storeToRefs(playerQuery);

const playerNameCriteria = /^[a-zA-Z0-9_]{3,16}$/;

const playerData = ref(null);
const playerLoading = ref(false);
let playerLoadingTimeout;

watch(() => route.params.playerName, useFetch, { immediate: true });

async function useFetch() {
  try {
    playerLoadingTimeout = setTimeout(() => {
      playerLoading.value = true;
    }, 200);

    queryInput.value = route.params.playerName;
    if (!playerNameCriteria.test(queryInput.value)) {
      throw new Error(`Invalid player name "${queryInput.value}"`);
    }

    const playerResponse = await fetch(`https://mc-inspect-api.tech-nik09.workers.dev/players/${queryInput.value}`);
    if (!playerResponse.ok) {
      throw new Error(`Could not find player "${queryInput.value}"`);
    }
    playerData.value = await playerResponse.json();

    queryInput.value = null;
    queryError.value = null;
  } catch (error) {
    queryError.value = error;
    router.push({ name: 'players' });
    console.error(error);
  } finally {
    clearTimeout(playerLoadingTimeout);
    playerLoading.value = false;
  }
}
</script>

<template>
  <h1>Player Info</h1>
  <p>Placeholder text for player info site.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <input
    type="text"
    :disabled="playerLoading"
    v-model="queryInput"
    @keyup.enter="router.push({ name: 'playerInfo', params: { playerName: queryInput } })"
  />

  <h2>Fetched player data</h2>
  <template v-if="playerData">
    <p>name: {{ playerData.name }}</p>
    <p>uuid: {{ playerData.uuid }}</p>
    <p>skinId: {{ playerData.skinId }}</p>
    <p>playerModel: {{ playerData.playerModel }}</p>
    <p>skinUrl: {{ playerData.skinUrl }}</p>
    <p v-if="playerData.capeUrl">capeUrl: {{ playerData.capeUrl }}</p>

    <img :src="playerData.skinUrl" alt="" />
    <img v-if="playerData.capeUrl" :src="playerData.capeUrl" alt="" />
    <img :src="`https://vzge.me/full/192/${playerData.skinId}.webp?${playerData.playerModel}&no=shadow`" alt="" />
  </template>
  <p v-if="playerLoading" style="background-color: red">Loading player data...</p>
</template>

<style scoped></style>
