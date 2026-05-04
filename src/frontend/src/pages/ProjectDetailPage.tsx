import type { MediaItemView } from "@/backend";
import { MediaType } from "@/backend";
import { AppButton } from "@/components/common/AppButton";
import { AppModal } from "@/components/common/AppModal";
import { AppProgressBar } from "@/components/common/AppProgressBar";
import { MediaGrid } from "@/components/media/MediaGrid";
import { UploadZone } from "@/components/media/UploadZone";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useAddMedia,
  useDeleteMedia,
  useProjectMedia,
} from "@/hooks/useProjectMedia";
import { useProject } from "@/hooks/useProjects";
import {
  useAddComment,
  useDeleteComment,
  useGetLikeCount,
  useHasLiked,
  useLikeProject,
  useListComments,
  useUnlikeProject,
} from "@/hooks/useSocial";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Music,
  Send,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} day${d === 1 ? "" : "s"} ago`;
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function truncatePrincipal(p: string, len = 12): string {
  return p.length > len ? `${p.slice(0, 6)}…${p.slice(-4)}` : p;
}

export default function ProjectDetailPage() {
  const { id } = useParams({ from: "/app-layout/projects/$id" });
  const projectId = BigInt(id);
  const { isAuthenticated, principalText } = useAuth();

  const { data: project, isLoading: projectLoading } = useProject(projectId);
  const { data: media = [], isLoading: mediaLoading } =
    useProjectMedia(projectId);
  const { mutateAsync: addMedia } = useAddMedia();
  const { mutate: deleteMedia } = useDeleteMedia();

  // Social hooks
  const { data: hasLiked = false } = useHasLiked(projectId);
  const { data: likeCount = 0 } = useGetLikeCount(projectId);
  const { mutate: likeProject } = useLikeProject();
  const { mutate: unlikeProject } = useUnlikeProject();
  const { data: comments = [] } = useListComments(projectId);
  const { mutate: addComment, isPending: addingComment } = useAddComment();
  const { mutate: deleteComment } = useDeleteComment();

  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeMedia, setActiveMedia] = useState<MediaItemView | null>(null);
  const [commentText, setCommentText] = useState("");
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleFiles = async (files: File[]) => {
    setUploading(true);
    setUploadProgress(0);
    try {
      for (const file of files) {
        await addMedia({
          projectId,
          file,
          caption: "",
          onProgress: setUploadProgress,
        });
      }
      toast.success(
        `${files.length} file${files.length > 1 ? "s" : ""} uploaded`,
      );
      setShowUpload(false);
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = (item: MediaItemView) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    deleteMedia(
      { mediaId: item.id, projectId },
      {
        onSuccess: () => toast.success("Media deleted"),
        onError: () => toast.error("Failed to delete"),
      },
    );
  };

  const handleToggleLike = () => {
    if (!isAuthenticated) {
      toast.error("Sign in to like");
      return;
    }
    if (hasLiked) unlikeProject(projectId);
    else likeProject(projectId);
  };

  const handleSubmitComment = () => {
    const text = commentText.trim();
    if (!text) return;
    if (!isAuthenticated) {
      toast.error("Sign in to comment");
      return;
    }
    addComment(
      { projectId, text },
      {
        onSuccess: () => {
          setCommentText("");
          toast.success("Comment added");
        },
        onError: () => toast.error("Failed to add comment"),
      },
    );
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(
      { commentId, projectId },
      { onSuccess: () => toast.success("Comment deleted") },
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <p className="text-muted-foreground">Sign in to view projects</p>
      </div>
    );
  }

  if (projectLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="h-8 w-48 bg-secondary rounded animate-pulse mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-secondary animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
        <p className="text-foreground font-display font-semibold">
          Project not found
        </p>
        <Link to="/projects">
          <AppButton variant="outline" type="button">
            <ArrowLeft size={15} /> Back to Projects
          </AppButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/projects">
            <AppButton
              variant="ghost"
              size="icon"
              type="button"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </AppButton>
          </Link>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground leading-tight">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {project.description}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {media.length} item{media.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Like button */}
          <button
            type="button"
            data-ocid="project.like_button"
            onClick={handleToggleLike}
            aria-label={hasLiked ? "Unlike" : "Like"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm font-medium transition-smooth hover:bg-secondary"
          >
            <Heart
              size={15}
              className={
                hasLiked
                  ? "fill-foreground text-foreground"
                  : "text-muted-foreground"
              }
            />
            <span
              className={hasLiked ? "text-foreground" : "text-muted-foreground"}
            >
              {likeCount}
            </span>
          </button>
          <AppButton
            variant="default"
            onClick={() => setShowUpload(true)}
            data-ocid="project.upload.button"
            type="button"
            className="gradient-primary text-primary-foreground hover:opacity-90"
          >
            <Upload size={16} /> Upload
          </AppButton>
        </div>
      </div>

      {/* Media grid */}
      <MediaGrid
        items={media}
        isLoading={mediaLoading}
        onItemClick={setActiveMedia}
        onDeleteItem={handleDelete}
        columns={4}
        emptyState={
          <div
            data-ocid="project.media.empty_state"
            className="rounded-2xl border border-dashed border-border py-16 text-center"
          >
            <p className="font-display font-semibold text-foreground mb-2">
              No media yet
            </p>
            <p className="text-sm text-muted-foreground mb-5">
              Upload photos, videos, or audio files to this project
            </p>
            <AppButton
              variant="default"
              onClick={() => setShowUpload(true)}
              data-ocid="project.upload_first.button"
              type="button"
              className="gradient-primary text-primary-foreground hover:opacity-90 mx-auto"
            >
              <Upload size={16} /> Upload Files
            </AppButton>
          </div>
        }
      />

      {/* Comments section */}
      <Separator className="my-8" />
      <section data-ocid="project.comments.section">
        <div className="flex items-center gap-2 mb-5">
          <MessageCircle size={18} className="text-foreground" />
          <h2 className="font-display font-semibold text-lg text-foreground">
            Comments{comments.length > 0 ? ` (${comments.length})` : ""}
          </h2>
        </div>

        {/* Comment input */}
        {isAuthenticated && (
          <div className="flex gap-3 mb-6">
            <Textarea
              ref={commentInputRef}
              data-ocid="project.comment.input"
              placeholder="Write a comment…"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey))
                  handleSubmitComment();
              }}
              rows={2}
              className="resize-none flex-1 bg-secondary/40 border-border text-foreground placeholder:text-muted-foreground"
            />
            <AppButton
              type="button"
              variant="default"
              onClick={handleSubmitComment}
              disabled={!commentText.trim() || addingComment}
              data-ocid="project.comment.submit_button"
              className="self-end gradient-primary text-primary-foreground"
            >
              <Send size={14} /> Post
            </AppButton>
          </div>
        )}
        {!isAuthenticated && (
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to leave a comment.
          </p>
        )}

        {/* Comments list */}
        {comments.length === 0 ? (
          <div
            data-ocid="project.comments.empty_state"
            className="rounded-xl border border-dashed border-border py-10 text-center"
          >
            <p className="text-sm text-muted-foreground">
              No comments yet. Be the first!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {comments.map((comment, i) => (
              <div
                key={comment.id}
                data-ocid={`project.comment.item.${i + 1}`}
                className="flex gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 text-xs font-mono text-muted-foreground">
                  {comment.authorPrincipal.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">
                      {comment.authorName ??
                        truncatePrincipal(comment.authorPrincipal)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(Number(comment.createdAt))}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mt-0.5 break-words">
                    {comment.text}
                  </p>
                </div>
                {comment.authorPrincipal === principalText && (
                  <button
                    type="button"
                    onClick={() => handleDeleteComment(comment.id)}
                    data-ocid={`project.comment.delete_button.${i + 1}`}
                    aria-label="Delete comment"
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth self-start"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Upload Modal */}
      <AppModal
        open={showUpload}
        onOpenChange={setShowUpload}
        title="Upload Media"
        description="Add photos, videos, or audio to this project"
      >
        <UploadZone
          onFiles={handleFiles}
          uploading={uploading}
          progress={uploadProgress}
        />
        {uploading && (
          <div className="mt-4">
            <AppProgressBar
              value={uploadProgress}
              showLabel
              label="Uploading..."
            />
          </div>
        )}
      </AppModal>

      {/* Lightbox */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={() => setActiveMedia(null)}
          onKeyDown={(e) => e.key === "Escape" && setActiveMedia(null)}
          data-ocid="project.lightbox.dialog"
          aria-label="Media lightbox"
        >
          <button
            type="button"
            className="absolute top-4 right-4 rounded-full bg-secondary/80 backdrop-blur-sm p-2.5 text-foreground hover:bg-muted transition-smooth"
            onClick={() => setActiveMedia(null)}
            data-ocid="project.lightbox.close_button"
            aria-label="Close lightbox"
          >
            <X size={18} />
          </button>
          <div
            className="max-w-4xl max-h-[90vh] w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {activeMedia.mediaType === MediaType.photo && (
              <img
                src={activeMedia.blob.getDirectURL()}
                alt={activeMedia.name}
                className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-elevated"
              />
            )}
            {activeMedia.mediaType === MediaType.video && (
              <video
                src={activeMedia.blob.getDirectURL()}
                controls
                autoPlay
                className="max-h-[80vh] max-w-full rounded-2xl shadow-elevated"
              >
                <track kind="captions" />
              </video>
            )}
            {activeMedia.mediaType === MediaType.audio && (
              <div className="flex flex-col items-center gap-5 p-10">
                <div className="rounded-full gradient-primary p-10 shadow-elevated">
                  <Music size={44} className="text-primary-foreground" />
                </div>
                <p className="font-display font-semibold text-lg text-foreground">
                  {activeMedia.name}
                </p>
                <audio
                  src={activeMedia.blob.getDirectURL()}
                  controls
                  className="w-full"
                >
                  <track kind="captions" />
                </audio>
              </div>
            )}
            {activeMedia.caption && (
              <p className="text-sm text-muted-foreground">
                {activeMedia.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
