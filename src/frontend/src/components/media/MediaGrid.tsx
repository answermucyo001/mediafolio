import type { MediaItemView } from "@/backend";
import { MediaType } from "@/backend";
import { MediaThumbnail } from "@/components/media/MediaThumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, Film, Music, X } from "lucide-react";

interface MediaGridProps {
  items: MediaItemView[];
  isLoading?: boolean;
  onItemClick?: (item: MediaItemView) => void;
  onDeleteItem?: (item: MediaItemView) => void;
  emptyState?: React.ReactNode;
  columns?: 2 | 3 | 4;
}

const colClass = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

function MediaTypeBar({ items }: { items: MediaItemView[] }) {
  const photos = items.filter((m) => m.mediaType === MediaType.photo).length;
  const videos = items.filter((m) => m.mediaType === MediaType.video).length;
  const audios = items.filter((m) => m.mediaType === MediaType.audio).length;

  if (items.length === 0) return null;

  return (
    <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
      {photos > 0 && (
        <span className="flex items-center gap-1">
          <Camera size={12} className="text-primary" />
          {photos} photo{photos !== 1 ? "s" : ""}
        </span>
      )}
      {videos > 0 && (
        <span className="flex items-center gap-1">
          <Film size={12} className="text-chart-2" />
          {videos} video{videos !== 1 ? "s" : ""}
        </span>
      )}
      {audios > 0 && (
        <span className="flex items-center gap-1">
          <Music size={12} className="text-chart-3" />
          {audios} audio file{audios !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}

export function MediaGrid({
  items,
  isLoading = false,
  onItemClick,
  onDeleteItem,
  emptyState,
  columns = 4,
}: MediaGridProps) {
  if (isLoading) {
    return (
      <div className={`grid ${colClass[columns]} gap-3`}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Skeleton key={i} className="aspect-square rounded-xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return emptyState ? <>{emptyState}</> : null;
  }

  return (
    <div>
      <MediaTypeBar items={items} />
      <div className={`grid ${colClass[columns]} gap-3`}>
        {items.map((item, i) => (
          <div
            key={item.id.toString()}
            className="relative group"
            data-ocid={`media.item.${i + 1}`}
          >
            <MediaThumbnail
              item={item}
              onClick={() => onItemClick?.(item)}
              showCaption
            />
            {onDeleteItem && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(item);
                }}
                className="absolute top-2 left-2 rounded-md bg-black/70 backdrop-blur-sm p-1.5 opacity-0 group-hover:opacity-100 transition-smooth text-foreground hover:text-destructive"
                aria-label={`Delete ${item.name}`}
                data-ocid={`media.delete_button.${i + 1}`}
              >
                <X size={13} />
              </button>
            )}
            {item.mediaType !== MediaType.photo && (
              <div className="absolute bottom-2 left-2 pointer-events-none">
                <span className="text-[10px] bg-black/60 backdrop-blur-sm text-foreground px-1.5 py-0.5 rounded">
                  {item.mediaType}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
