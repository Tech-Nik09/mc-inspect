<script setup>
import { usePlayerStore } from '@/stores/player';
import { useFileDownload } from '@/composables/downloadFileFromURL';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';
import CopyButton from '@/components/CopyButton.vue';
import { storeToRefs } from 'pinia';

const playerStore = usePlayerStore();
const { isLoading, data } = storeToRefs(playerStore);

const { isDownloading, downloadFileFromURL } = useFileDownload();

const currentLocation = window.location.href;
</script>

<template>
  <h1>Player Info</h1>
  <p>Placeholder text for player info site.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <PlayerSearchBar />

  <div>
    <CopyButton :text="currentLocation" label="shareable link" />
    <button :disabled="isDownloading" @click="downloadFileFromURL(data.skinUrl, `${data.name}_skin.png`)">
      {{ isDownloading ? 'Downloading...' : 'Download Skin' }}
    </button>
    <button v-if="data.capeUrl" :disabled="isDownloading" @click="downloadFileFromURL(data.capeUrl, `${data.name}_cape.png`)">
      {{ isDownloading ? 'Downloading...' : 'Download Cape' }}
    </button>
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

  <p v-if="isLoading">Loading</p>
</template>

<style scoped></style>
