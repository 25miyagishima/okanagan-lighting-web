import {
  MEDIA_IMAGE_QUALITY,
  MEDIA_PREVIEW_WIDTH,
} from "../media-config";

export async function compressImageForUpload(file: File) {
  if (!file.type.startsWith("image/")) {
    return file;
  }

  if (file.type === "image/heic" || file.type === "image/heif") {
    return file;
  }

  const imageBitmap = await createImageBitmap(file);

  const scale = Math.min(1, MEDIA_PREVIEW_WIDTH / imageBitmap.width);
  const width = Math.round(imageBitmap.width * scale);
  const height = Math.round(imageBitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    return file;
  }

  context.drawImage(imageBitmap, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(
      resolve,
      file.type === "image/png" ? "image/png" : "image/jpeg",
      MEDIA_IMAGE_QUALITY,
    );
  });

  imageBitmap.close();

  if (!blob) {
    return file;
  }

  const extension = file.type === "image/png" ? "png" : "jpg";
  const baseName = file.name.replace(/\.[^.]+$/, "");

  return new File(
    [blob],
    `${baseName}-compressed.${extension}`,
    {
      type: file.type === "image/png" ? "image/png" : "image/jpeg",
      lastModified: Date.now(),
    },
  );
}