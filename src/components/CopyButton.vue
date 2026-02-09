<script setup>
import { useClipboard } from '@/composables/copyToClipboard';

const { isCopied, copyToClipboard } = useClipboard();

const props = defineProps(['text', 'label']);
</script>

<template>
  <button @click="copyToClipboard(props.text)">{{ isCopied ? 'Copied' : `Copy ${props.label}` }}</button>
</template>

<style scoped></style>
