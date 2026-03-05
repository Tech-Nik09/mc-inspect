import { ref } from 'vue';
import type { Ref } from 'vue';

type UseFileDownload = {
  isDownloading: Ref<boolean>;
  downloadFileFromURL: (url: string, filename: string) => Promise<void>;
};

export function useFileDownload(): UseFileDownload {
  const isDownloading = ref(false);
  let downloadingTimeout: number | undefined;

  async function downloadFileFromURL(url: string, filename: string): Promise<void> {
    try {
      downloadingTimeout = setTimeout(() => {
        isDownloading.value = true;
      }, 200);

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Could not find URL "${url}"`);

      const blob = await res.blob();
      const objectURL = URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = objectURL;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();

      URL.revokeObjectURL(objectURL);
      document.body.removeChild(anchor);
    } catch (err) {
      console.error(`Error while downloading from URL "${url}": ${err}`);
    } finally {
      clearTimeout(downloadingTimeout);
      isDownloading.value = false;
    }
  }

  return { isDownloading, downloadFileFromURL };
}
