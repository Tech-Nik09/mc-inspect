<script setup>
import { usePlayerStore } from '@/stores/player';
import PlayerSearchBar from '@/components/PlayerSearchBar.vue';
import { useClipboard } from '@/composables/copyToClipboard';
import { useFileDownload } from '@/composables/downloadFileFromURL';
import { storeToRefs } from 'pinia';

const playerStore = usePlayerStore();
const { isLoading, data } = storeToRefs(playerStore);

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
    <button :disabled="isDownloading" @click="downloadFileFromURL(data.skinUrl, `${data.name}_skin.png`)">
      {{ isDownloading ? 'Downloading...' : 'Download Skin' }}
    </button>
    <button v-if="data.capeUrl" :disabled="isDownloading" @click="downloadFileFromURL(data.capeUrl, `${data.name}_cape.png`)">
      {{ isDownloading ? 'Downloading...' : 'Download Cape' }}
    </button>
  </div>

  <h2>Fetched player data</h2>
  <p>name: {{ data.name }}</p>
  <button @click="copyToClipboard(data.name)">Copy name</button>
  <p>uuid: {{ data.uuid }}</p>
  <button @click="copyToClipboard(data.uuid)">Copy uuid</button>
  <p>skinId: {{ data.skinId }}</p>
  <button @click="copyToClipboard(data.skinId)">Copy skinId</button>
  <p>playerModel: {{ data.playerModel }}</p>
  <button @click="copyToClipboard(data.playerModel)">Copy playerModel</button>
  <p>skinUrl: {{ data.skinUrl }}</p>
  <button @click="copyToClipboard(data.skinUrl)">Copy skinUrl</button>
  <template v-if="data.capeUrl">
    <p>capeUrl: {{ data.capeUrl }}</p>
    <button @click="copyToClipboard(data.capeUrl)">Copy caleUrl</button>
  </template>

  <div>
    <img :src="data.skinUrl" alt="" />
    <img v-if="data.capeUrl" :src="data.capeUrl" alt="" />
    <img :src="`https://vzge.me/face/64/${data.skinId}.webp?${data.playerModel}&no=shadow`" alt="" />
  </div>

  <p v-if="isLoading">Loading</p>
</template>

<style scoped></style>
