import { ref } from 'vue';

export function useClipboard() {
  const isCopied = ref(false);
  let timeout = null;

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text || window.location.href);

      clearTimeout(timeout);
      isCopied.value = true;

      timeout = setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    } catch (err) {
      console.error(`Error while copying URL to clipboard: ${err}`);
    }
  }

  return { isCopied, copyToClipboard };
}
