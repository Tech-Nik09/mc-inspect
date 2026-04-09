<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { onStartTyping } from '@vueuse/core';

const props = defineProps<{
  isLoading: boolean;
  placeholder?: string;
}>();

const emit = defineEmits(['query']);

const model = defineModel();

function query(): void {
  if (!props.isLoading) emit('query');
}

const searchBar = useTemplateRef('searchBar');
onStartTyping(() => {
  searchBar.value?.focus();
});
</script>

<template>
  <div class="flex h-12 max-w-lg">
    <input
      type="text"
      @keyup.enter="query"
      v-model="model"
      :disabled="isLoading"
      :placeholder
      ref="searchBar"
      class="w-full rounded-l-2xl border-2 border-r-0 border-accent px-4 text-lg outline-hidden placeholder:text-gray-500"
    />
    <button :disabled="isLoading" @click="query" class="btn-primary h-full w-20 rounded-l-none border-l-0">
      {{ isLoading ? 'loading' : 'Search' }}
    </button>
  </div>
</template>
