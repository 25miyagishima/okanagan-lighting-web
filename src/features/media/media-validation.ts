const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

const maxFileSizeBytes = 8 * 1024 * 1024;

export function validateMediaFile(file: File) {
  if (!allowedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Please upload a JPEG, PNG, WebP, HEIC, or HEIF image.",
    };
  }

  if (file.size > maxFileSizeBytes) {
    return {
      valid: false,
      error: "Image must be under 8MB.",
    };
  }

  return {
    valid: true,
    error: null,
  };
}