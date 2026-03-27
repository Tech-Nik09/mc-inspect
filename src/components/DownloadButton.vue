<script setup lang="ts">
import { useFileDownload } from '@/composables/downloadFileFromURL';

const { downloadFileFromURL } = useFileDownload();

const props = defineProps<{
  url: string;
  filename: string;
  label: string;
}>();
</script>

<template>
  <button @click="downloadFileFromURL(props.url, props.filename)">Download {{ props.label }}</button>
</template>
