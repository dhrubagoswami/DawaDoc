const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.82;

export interface PreparedImage {
  base64: string;
  mimeType: string;
  previewUrl: string;
}

export async function prepareImageFile(file: File): Promise<PreparedImage> {
  const bitmap = await createImageBitmap(file);

  let { width, height } = bitmap;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const scale = MAX_DIMENSION / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process image.");
  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to encode image."))),
      "image/jpeg",
      JPEG_QUALITY
    );
  });

  const base64 = await blobToBase64(blob);
  const previewUrl = URL.createObjectURL(blob);

  return { base64, mimeType: "image/jpeg", previewUrl };
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] ?? "";
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
