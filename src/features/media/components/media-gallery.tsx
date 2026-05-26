import type { MediaAssetWithUrl } from "../actions/get-media-signed-urls";
import { MediaLightbox } from "./media-lightbox";

type MediaGalleryProps = {
  media: MediaAssetWithUrl[];
  title?: string;
};

export function MediaGallery({
  media,
  title = "Photos",
}: MediaGalleryProps) {
  if (media.length === 0) {
    return (
      <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm text-[#9EA3AA]">
        No photos uploaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-[#F5F5F1]">
        {title}
      </h3>

      <MediaLightbox media={media} />
    </div>
  );
}