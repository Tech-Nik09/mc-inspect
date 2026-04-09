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
      class="w-full rounded-l-2xl border-2 border-r-0 border-accent px-4 text-lg outline-hidden placeholder:text-slate-300 disabled:text-slate-300 dark:placeholder:text-slate-600 dark:disabled:text-slate-600"
    />
    <button :disabled="isLoading" @click="query" class="btn-primary h-full w-24 rounded-l-none px-0 disabled:border-accent">
      {{ isLoading ? 'loading' : 'Search' }}
    </button>
  </div>
</template>
