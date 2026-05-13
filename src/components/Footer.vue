<script setup lang="ts">
import MdiCopyright from '~icons/mdi/copyright';
import MdiExternalLink from '~icons/mdi/external-link';

type Link = {
  href: string;
  text: string;
};
const links: Record<string, Link> = {
  association: { href: 'https://github.com/nkmLABS/mc-inspect/blob/main/README.md', text: 'Not associated with Mojang' },
  licensing: { href: 'https://github.com/nkmLABS/mc-inspect/blob/main/README.md', text: 'Third-party software components' },
} as const;
</script>

<template>
  <footer
    class="mt-8 grid grid-cols-1 place-items-center items-center gap-y-4 border-t-2 border-slate-400 px-2 py-6 text-xs sm:px-4 md:grid-cols-3 dark:border-slate-600"
  >
    <div class="md:place-self-start">
      <a v-for="(link, key) in links" :key :href="link.href" target="_blank" class="block w-fit hover-smooth hover:text-accent">
        {{ link.text }}
        <MdiExternalLink class="inline-block size-3.5 align-text-top text-accent" />
      </a>
    </div>

    <div>
      <MdiCopyright class="inline-block size-3.5 align-text-top" />
      2026 Niklas Maroldt
    </div>
  </footer>
</template>
