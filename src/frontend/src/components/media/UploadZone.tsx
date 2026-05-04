import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  CloudUpload,
  File,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import {
  type ChangeEvent,
  type DragEvent,
  useCallback,
  useRef,
  useState,
} from "react";

interface FileQueueItem {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
}

interface UploadZoneProps {
  onFiles: (files: File[]) => void;
  uploading?: boolean;
  progress?: number;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadZone({
  onFiles,
  uploading = false,
  progress = 0,
  accept = "image/*,video/*,audio/*",
  multiple = true,
  className,
}: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [queue, setQueue] = useState<FileQueueItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const buildQueue = useCallback(
    (files: File[]): FileQueueItem[] =>
      files.map((file) => ({ file, progress: 0, status: "pending" as const })),
    [],
  );

  const handleDrag = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (!files.length) return;
    setQueue(buildQueue(files));
    onFiles(files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setQueue(buildQueue(files));
    onFiles(files);
    e.target.value = "";
  };

  // Sync per-file progress from overall progress when uploading
  const doneCount = uploading
    ? Math.floor((progress / 100) * queue.length)
    : queue.length;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Drop target */}
      <button
        type="button"
        tabIndex={0}
        data-ocid="upload.dropzone"
        aria-label="Drop files here or click to browse"
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-smooth cursor-pointer w-full text-left",
          dragActive
            ? "border-foreground bg-secondary scale-[1.01]"
            : "border-border hover:border-foreground/50 hover:bg-secondary/50",
          uploading && "pointer-events-none opacity-70",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") &&
          !uploading &&
          inputRef.current?.click()
        }
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
        />

        <div className="flex flex-col items-center gap-3 py-10 px-6">
          <div
            className={cn(
              "rounded-full p-4 transition-smooth",
              dragActive ? "bg-foreground" : "bg-secondary",
            )}
          >
            <CloudUpload
              size={28}
              className={cn(
                dragActive ? "text-background" : "text-muted-foreground",
              )}
            />
          </div>
          <div className="text-center">
            <p className="font-display font-semibold text-foreground">
              {dragActive ? "Drop to upload" : "Drop files here"}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Photos, videos, and audio — no limit
            </p>
          </div>
          {!dragActive && (
            <Button
              data-ocid="upload.upload_button"
              variant="default"
              size="sm"
              type="button"
              className="mt-1 w-36 gradient-primary text-primary-foreground hover:opacity-90"
            >
              <Upload size={14} /> Browse files
            </Button>
          )}
        </div>
      </button>

      {/* File queue */}
      {queue.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {queue.length} file{queue.length !== 1 ? "s" : ""} selected
            </span>
            {uploading && (
              <span>
                {doneCount} / {queue.length} done
              </span>
            )}
          </div>
          {/* Overall progress bar */}
          {uploading && (
            <div className="space-y-1">
              <Progress value={progress} className="h-1.5 bg-secondary" />
            </div>
          )}
          <div className="max-h-48 overflow-y-auto flex flex-col gap-1.5 pr-1">
            {queue.map((item, i) => {
              const isDone = i < doneCount;
              const isActive = uploading && i === doneCount;
              return (
                <div
                  key={`${item.file.name}-${i}`}
                  data-ocid={`upload.queue.item.${i + 1}`}
                  className="flex items-center gap-2.5 rounded-lg bg-secondary/60 px-3 py-2 text-sm"
                >
                  <File size={13} className="text-muted-foreground shrink-0" />
                  <span className="flex-1 truncate text-foreground min-w-0">
                    {item.file.name}
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatFileSize(item.file.size)}
                  </span>
                  <span className="shrink-0">
                    {isDone ? (
                      <CheckCircle2 size={14} className="text-foreground" />
                    ) : isActive ? (
                      <Loader2
                        size={14}
                        className="text-foreground animate-spin"
                      />
                    ) : (
                      <X size={14} className="text-muted-foreground" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
