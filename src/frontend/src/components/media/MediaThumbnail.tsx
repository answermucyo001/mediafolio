import type { MediaItemView } from "@/backend";
import { MediaType } from "@/backend";
import { cn } from "@/lib/utils";
import { Camera, Film, Music, Play } from "lucide-react";

interface MediaThumbnailProps {
  item: MediaItemView;
  className?: string;
  onClick?: () => void;
  showCaption?: boolean;
}

export function MediaThumbnail({
  item,
  className,
  onClick,
  showCaption = false,
}: MediaThumbnailProps) {
  const category = item.mediaType;
  const url = item.blob.getDirectURL();

  const Icon =
    category === MediaType.photo
      ? Camera
      : category === MediaType.video
        ? Film
        : Music;

  return (
    <button
      type="button"
      className={cn(
        "relative group overflow-hidden rounded-xl bg-secondary cursor-pointer",
        "w-full aspect-square transition-smooth hover:scale-[1.02]",
        className,
      )}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      aria-label={item.name}
    >
      {/* Media display */}
      {category === MediaType.photo && (
        <img
          src={url}
          alt={item.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
        />
      )}

      {category === MediaType.video && (
        <div className="relative w-full h-full bg-secondary">
          <video
            src={url}
            className="w-full h-full object-cover"
            muted
            preload="metadata"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/60 p-3 backdrop-blur-sm">
              <Play size={20} className="text-foreground fill-foreground" />
            </div>
          </div>
        </div>
      )}

      {category === MediaType.audio && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-secondary gap-3">
          <div className="rounded-full gradient-primary p-4">
            <Music size={24} className="text-primary-foreground" />
          </div>
          <div className="flex gap-1 items-end h-6">
            {[3, 6, 4, 8, 5, 7, 3, 6, 4].map((h, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static waveform bars
                key={i}
                className="w-1 rounded-full bg-primary/60"
                style={{ height: `${h * 3}px` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Overlay badge */}
      <div className="absolute top-2 right-2 rounded-md bg-black/60 backdrop-blur-sm p-1.5">
        <Icon size={12} className="text-foreground" />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth" />

      {/* Caption */}
      {showCaption && item.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <p className="text-xs text-foreground truncate">{item.caption}</p>
        </div>
      )}
    </button>
  );
}
