import { ref } from 'vue';

export function useFileDownload() {
  const isDownloading = ref(false);

  async function downloadFileFromURL(url, filename) {
    let downloadingTimeout;

    try {
      downloadingTimeout = setTimeout(() => {
        isDownloading.value = true;
      }, 200);

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Could not find URL "${url}"`);
      }

      const blob = await res.blob();
      const objectURL = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(objectURL);
      document.body.removeChild(link);
    } catch (err) {
      console.error(`Error while downloading from URL "${url}": ${err}`);
    } finally {
      clearTimeout(downloadingTimeout);
      isDownloading.value = false;
    }
  }

  return { isDownloading, downloadFileFromURL };
}
