<script setup>
import { usePlayerStore } from '@/stores/player';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';
import { useClipboard } from '@/composables/copyToClipboard';
import { useFileDownload } from '@/composables/downloadFileFromURL';

const playerStore = usePlayerStore();

const { isCopied, copyToClipboard } = useClipboard();
const { isDownloading, downloadFileFromURL } = useFileDownload();
</script>

<template>
  <h1>Player Info</h1>
  <p>Placeholder text for player info site.</p>
  <p>Route path: {{ $route.path }}</p>
  <p>Route params: {{ $route.params }}</p>

  <PlayerSearchBar />

  <div>
    <button @click="copyToClipboard()">{{ isCopied ? 'Copied to clipboard...' : 'Copy URL to clipboard' }}</button>
    <button :disabled="isDownloading" @click="downloadFileFromURL(playerStore.data.skinUrl, `${playerStore.data.name}_skin.png`)">
      {{ isDownloading ? 'Downloading...' : 'Download Skin' }}
    </button>
    <button
      v-if="playerStore.data.capeUrl"
      :disabled="isDownloading"
      @click="downloadFileFromURL(playerStore.data.capeUrl, `${playerStore.data.name}_cape.png`)"
    >
      {{ isDownloading ? 'Downloading...' : 'Download Cape' }}
    </button>
  </div>

  <h2>Fetched player data</h2>
  <template v-if="playerStore.data">
    <p>name: {{ playerStore.data.name }}</p>
    <p>uuid: {{ playerStore.data.uuid }}</p>
    <p>skinId: {{ playerStore.data.skinId }}</p>
    <p>playerModel: {{ playerStore.data.playerModel }}</p>
    <p>skinUrl: {{ playerStore.data.skinUrl }}</p>
    <p v-if="playerStore.data.capeUrl">capeUrl: {{ playerStore.data.capeUrl }}</p>

    <img :src="playerStore.data.skinUrl" alt="" />
    <img v-if="playerStore.data.capeUrl" :src="playerStore.data.capeUrl" alt="" />
    <img :src="`https://vzge.me/full/192/${playerStore.data.skinId}.webp?${playerStore.data.playerModel}&no=shadow`" alt="" />
  </template>
  <p v-if="playerStore.isLoading">Loading</p>
</template>

<style scoped></style>
