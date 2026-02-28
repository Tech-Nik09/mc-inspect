<script setup lang="ts">
import { useFileDownload } from '@/composables/downloadFileFromURL';

const { isDownloading, downloadFileFromURL } = useFileDownload();

const props = defineProps<{
  url: string;
  filename: string;
  label: string;
}>();
</script>

<template>
  <button :disabled="isDownloading" @click="downloadFileFromURL(props.url, props.filename)">
    {{ isDownloading ? 'Downloading' : `Download ${props.label}` }}
  </button>
</template>

<style scoped></style>
