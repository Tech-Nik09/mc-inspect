<script setup>
import { usePlayerStore } from '@/stores/player';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';
import CopyButton from '@/components/CopyButton.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import FavoriteToggle from '@/components/FavoriteToggle.vue';
import { defineAsyncComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
const SkinView = defineAsyncComponent(() => import('@/components/SkinCanvas.vue'));

const playerStore = usePlayerStore();
const { isLoading, data } = storeToRefs(playerStore);

const route = useRoute();
const currentLocation = ref(null);

watch(
  route,
  () => {
    currentLocation.value = window.location.href;
  },
  { immediate: true },
);
</script>

<template>
  <h1>Player Info</h1>
  <p>Placeholder text for player info site.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <PlayerSearchBar />

  <div>
    <CopyButton :text="currentLocation" label="shareable link" />
    <DownloadButton :url="data.skinUrl" :filename="`${data.name}_skin.png`" label="Skin" />
    <DownloadButton v-if="data.capeUrl" :url="data.capeUrl" :filename="`${data.name}_cape.png`" label="Cape" />
    <FavoriteToggle :id="data.uuid" type="player" :data="{ name: data.name, uuid: data.uuid, skinId: data.skinId }" />
  </div>

  <h2>Fetched player data</h2>
  <p>name: {{ data.name }}</p>
  <CopyButton :text="data.name" label="Name" />

  <p>uuid: {{ data.uuid }}</p>
  <CopyButton :text="data.uuid" label="UUID" />

  <p>skinId: {{ data.skinId }}</p>
  <CopyButton :text="data.skinId" label="Skin ID" />

  <p>playerModel: {{ data.playerModel }}</p>
  <CopyButton :text="data.playerModel" label="Model" />

  <p>skinUrl: {{ data.skinUrl }}</p>
  <CopyButton :text="data.skinUrl" label="Skin URL" />

  <template v-if="data.capeUrl">
    <p>capeUrl: {{ data.capeUrl }}</p>
    <CopyButton :text="data.capeUrl" label="Cape URL" />
  </template>

  <div>
    <img :src="data.skinUrl" alt="" />
    <img v-if="data.capeUrl" :src="data.capeUrl" alt="" />
    <img :src="`https://vzge.me/face/64/${data.skinId}.webp?${data.playerModel}&no=shadow`" alt="" />
  </div>

  <SkinView />

  <p v-if="isLoading">Loading</p>
</template>

<style scoped></style>
