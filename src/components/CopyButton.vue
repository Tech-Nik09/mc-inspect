<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '@/composables/clipboard';

const { isCopied, copyToClipboard } = useClipboard();

const props = defineProps<{
  text: string;
  label?: string;
}>();

const buttonLabel = computed<string>(() => {
  if (isCopied.value) return 'Copied';
  if (props.label) return `Copy ${props.label}`;
  return 'Copy';
});
</script>

<template>
  <button @click="copyToClipboard(text)">{{ buttonLabel }}</button>
</template>
