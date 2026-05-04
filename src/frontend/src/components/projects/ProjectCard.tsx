import type { MediaItemView, ProjectView } from "@/backend";
import { MediaType } from "@/backend";
import { AppButton } from "@/components/common/AppButton";
import { Badge } from "@/components/ui/badge";
import { useProjectMedia } from "@/hooks/useProjectMedia";
import { useGetLikeCount, useListComments } from "@/hooks/useSocial";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Camera,
  Film,
  Heart,
  MessageCircle,
  Music,
  Trash2,
} from "lucide-react";

interface ProjectCardProps {
  project: ProjectView;
  index: number;
  onDelete: (project: ProjectView) => void;
  isDeleting?: boolean;
}

function CoverImage({ projectId }: { projectId: bigint }) {
  const { data: media = [] } = useProjectMedia(projectId);

  const photos = media.filter((m) => m.mediaType === MediaType.photo);
  const cover = photos[0] ?? media[0];

  if (!cover) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-secondary">
        <div className="flex gap-2 opacity-30">
          <Camera size={16} className="text-muted-foreground" />
          <Film size={16} className="text-muted-foreground" />
          <Music size={16} className="text-muted-foreground" />
        </div>
        <span className="text-xs text-muted-foreground">No media yet</span>
      </div>
    );
  }

  const isPhoto = cover.mediaType === MediaType.photo;
  const url = cover.blob.getDirectURL();

  return isPhoto ? (
    <img
      src={url}
      alt={cover.name}
      className="w-full h-full object-cover transition-smooth group-hover:scale-105"
      loading="lazy"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-secondary">
      {cover.mediaType === MediaType.video ? (
        <Film size={28} className="text-muted-foreground" />
      ) : (
        <Music size={28} className="text-muted-foreground" />
      )}
    </div>
  );
}

function formatDate(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function SocialBadges({ projectId }: { projectId: bigint }) {
  const { data: likeCount = 0 } = useGetLikeCount(projectId);
  const { data: comments = [] } = useListComments(projectId);
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
        <Heart size={11} /> {likeCount}
      </span>
      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
        <MessageCircle size={11} /> {comments.length}
      </span>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  onDelete,
  isDeleting,
}: ProjectCardProps) {
  return (
    <div
      data-ocid={`projects.item.${index}`}
      className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-smooth hover:shadow-elevated"
    >
      {/* Cover image */}
      <Link
        to="/projects/$id"
        params={{ id: project.id.toString() }}
        data-ocid={`projects.item.${index}.link`}
        className="block"
      >
        <div className="relative overflow-hidden h-44">
          <CoverImage projectId={project.id} />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        </div>

        {/* Card body */}
        <div className="p-4">
          <h3 className="font-display font-semibold text-base text-foreground truncate leading-snug">
            {project.title}
          </h3>
          {project.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar size={11} />
              <span>{formatDate(project.createdAt)}</span>
            </div>
            <SocialBadges projectId={project.id} />
          </div>
        </div>
      </Link>

      {/* Delete button */}
      <div className="px-4 pb-4">
        <AppButton
          variant="ghost"
          size="sm"
          onClick={() => onDelete(project)}
          disabled={isDeleting}
          data-ocid={`projects.delete_button.${index}`}
          type="button"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 w-full text-xs"
        >
          <Trash2 size={12} /> Delete project
        </AppButton>
      </div>
    </div>
  );
}
