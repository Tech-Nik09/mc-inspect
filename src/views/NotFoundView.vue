<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const maxLength: number = 20;
const placeholder: string = '/...';

const displayedPath = ref('');

watch(
  () => route.path,
  (newPath) => {
    if (newPath.length <= maxLength) {
      displayedPath.value = newPath;
      return;
    }

    let path = newPath;
    const segments = path.split('/');

    while (segments.length > 0 && path.length > maxLength - placeholder.length) {
      segments.pop();
      path = segments.join('/');
    }

    displayedPath.value = path + placeholder;
  },
  { immediate: true },
);
</script>

<template>
  <section class="mt-8 flex flex-col items-center gap-4 sm:mt-16">
    <h1 class="font-sans text-4xl font-bold">404</h1>

    <div class="flex w-full max-w-lg flex-col items-center gap-4 rounded-2xl border-2 border-accent p-4 shadow-center-md shadow-accent">
      <div class="text-center">
        <p>This page does not exist.</p>
        <p>
          Path <span v-if="displayedPath" class="rounded-sm bg-slate-200 px-1 dark:bg-slate-800">{{ displayedPath }}</span> could not be found.
        </p>
      </div>

      <nav class="contents">
        <router-link :to="{ name: 'home' }" class="btn-primary w-full">Back to home</router-link>
        <a href="https://github.com/nkmLABS/mc-inspect" target="_self" class="btn-primary w-full">View project on GitHub</a>
      </nav>
    </div>
  </section>
</template>
