export async function compressPhotoBeforeUpload(file: File): Promise<File> {
  // Phase 11 will add real image compression.
  return file;
}

export async function uploadPhotoWithRetry() {
  // Phase 11 will add upload queue, retry logic, progress, and recovery.
  return null;
}
