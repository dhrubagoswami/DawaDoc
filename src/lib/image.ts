const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.82;

const THUMBNAIL_MAX_DIMENSION = 160;
const THUMBNAIL_QUALITY = 0.6;

export interface PreparedImage {
  base64: string;
  mimeType: string;
  previewUrl: string;
  thumbnailDataUrl: string;
}

export async function prepareImageFile(file: File): Promise<PreparedImage> {
  const bitmap = await createImageBitmap(file);

  const blob = await drawToJpegBlob(bitmap, MAX_DIMENSION, JPEG_QUALITY);
  const base64 = await blobToBase64(blob);
  const previewUrl = URL.createObjectURL(blob);

  const thumbnailBlob = await drawToJpegBlob(bitmap, THUMBNAIL_MAX_DIMENSION, THUMBNAIL_QUALITY);
  const thumbnailDataUrl = await blobToDataUrl(thumbnailBlob);

  return { base64, mimeType: "image/jpeg", previewUrl, thumbnailDataUrl };
}

async function drawToJpegBlob(bitmap: ImageBitmap, maxDimension: number, quality: number): Promise<Blob> {
  let { width, height } = bitmap;
  if (width > maxDimension || height > maxDimension) {
    const scale = maxDimension / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process image.");
  ctx.drawImage(bitmap, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to encode image."))),
      "image/jpeg",
      quality
    );
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function blobToBase64(blob: Blob): Promise<string> {
  const dataUrl = await blobToDataUrl(blob);
  return dataUrl.split(",")[1] ?? "";
}
