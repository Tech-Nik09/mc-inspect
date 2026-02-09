import { ref } from 'vue';

export function useClipboard() {
  const isCopied = ref(false);
  let isCopiedTimeout;

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);

      clearTimeout(isCopiedTimeout);
      isCopied.value = true;

      isCopiedTimeout = setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    } catch (err) {
      console.error(`Error while copying to clipboard: ${err}`);
    }
  }

  return { isCopied, copyToClipboard };
}
