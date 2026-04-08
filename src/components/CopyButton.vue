<script setup lang="ts">
import { useClipboard } from '@/composables/copyToClipboard';

const { isCopied, copyToClipboard } = useClipboard();

const props = defineProps<{
  text: string;
  label: string;
}>();
</script>

<template>
  <button @click="copyToClipboard(text)">{{ isCopied ? 'Copied' : `Copy ${label}` }}</button>
</template>
