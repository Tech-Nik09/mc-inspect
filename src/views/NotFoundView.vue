<script setup lang="ts">
import { ref, watchEffect, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const maxLength: number = 20;
const placeholder: string = '/...';

let path: Ref<string>;
watchEffect(() => {
  path = ref(route.path);
  if (path.value.length > maxLength) {
    while (true) {
      const segments = path.value.split('/');
      segments.pop();
      path.value = segments.join('/');
      if (path.value.length <= maxLength - placeholder.length) {
        path.value += placeholder;
        break;
      }
    }
  }
});
</script>

<template>
  <div class="flex flex-col items-center gap-4 pt-16">
    <h1 class="font-sans text-4xl font-bold">404</h1>

    <div class="flex w-full max-w-lg flex-col items-center gap-4 rounded-2xl border-2 border-accent p-4">
      <div class="text-center">
        <p>This page does not exist.</p>
        <p>
          Path <span class="rounded-sm bg-slate-200 px-1 dark:bg-slate-800">{{ path }}</span> could not be found.
        </p>
      </div>

      <nav class="contents">
        <router-link :to="{ name: 'home' }" class="btn-primary w-full">Back to home</router-link>
        <a href="https://github.com/nkmLABS/mc-inspect" target="_self" class="btn-primary w-full">View project on GitHub</a>
      </nav>
    </div>
  </div>
</template>
