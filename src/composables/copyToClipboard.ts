import { ref } from 'vue';
import type { Ref } from 'vue';

type UseClipboard = {
  isCopied: Ref<boolean>;
  copyToClipboard: (text: string) => Promise<void>;
};

export function useClipboard(): UseClipboard {
  const isCopied = ref(false);

  async function copyToClipboard(text: string): Promise<void> {
    let copiedTimeout: number | undefined;

    try {
      await navigator.clipboard.writeText(text);

      clearTimeout(copiedTimeout);
      isCopied.value = true;

      copiedTimeout = setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    } catch (err) {
      console.error(`Error while copying to clipboard: ${err}`);
    }
  }

  return { isCopied, copyToClipboard };
}
