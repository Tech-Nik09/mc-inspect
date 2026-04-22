<script setup lang="ts">
import MdiCopyright from '~icons/mdi/copyright';
import MdiExternalLink from '~icons/mdi/external-link';

type Link = {
  href: string;
  text: string;
};
const links: Record<string, Link> = {
  association: { href: 'https://github.com/nkmLABS/mc-inspect/blob/main/README.md', text: 'Not associated with Mojang in any way' },
  licensing: { href: 'https://github.com/nkmLABS/mc-inspect/blob/main/README.md', text: 'Third-party software components and assets' },
} as const;
</script>

<template>
  <footer class="mt-8 flex flex-col items-center gap-2 border-t-2 border-slate-400 px-2 py-6 text-sm sm:px-4 dark:border-slate-600">
    <div>
      <a v-for="(link, key) in links" :key :href="link.href" target="_blank" class="flex items-center gap-1">
        <p>{{ link.text }}</p>
        <MdiExternalLink class="size-4 text-accent" />
      </a>
    </div>

    <div class="flex items-center gap-1">
      <MdiCopyright class="size-4" />
      <p>2026 Niklas Maroldt</p>
    </div>
  </footer>
</template>
