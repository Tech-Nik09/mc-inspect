import { ref } from 'vue';

export function useClipboard() {
  const isCopied = ref(false);
  let isCopiedTimeout;

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text || window.location.href);

      clearTimeout(isCopiedTimeout);
      isCopied.value = true;

      isCopiedTimeout = setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    } catch (err) {
      console.error(`Error while copying URL to clipboard: ${err}`);
    }
  }

  return { isCopied, copyToClipboard };
}
