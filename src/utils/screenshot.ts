import { domToPng } from 'modern-screenshot';

async function takeScreenshotAndDownload(
  container: HTMLElement,
  filename: string
) {
  const png = await domToPng(container);

  const link = document.createElement('a');
  link.href = png;
  link.download = filename;
  link.click();
}

export { takeScreenshotAndDownload };
