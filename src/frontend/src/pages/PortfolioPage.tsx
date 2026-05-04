import type { MediaItemView, ProjectView } from "@/backend";
import { MediaType } from "@/backend";
import { AppAvatar } from "@/components/common/AppAvatar";
import { AppButton } from "@/components/common/AppButton";
import { MediaGrid } from "@/components/media/MediaGrid";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useProjectMedia } from "@/hooks/useProjectMedia";
import { usePortfolio } from "@/hooks/useProjects";
import {
  useFollowUser,
  useGetFollowerCount,
  useGetFollowingCount,
  useGetLikeCount,
  useIsFollowing,
  useUnfollowUser,
} from "@/hooks/useSocial";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Camera,
  Film,
  Heart,
  Music,
  UserCheck,
  UserMinus,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function ProjectLikeBadge({ projectId }: { projectId: bigint }) {
  const { data: likeCount = 0 } = useGetLikeCount(projectId);
  return (
    <Badge variant="outline" className="text-[10px] gap-1 py-0">
      <Heart size={9} /> {likeCount}
    </Badge>
  );
}

function ProjectSection({ project }: { project: ProjectView }) {
  const { data: media = [], isLoading } = useProjectMedia(project.id);
  const [activeMedia, setActiveMedia] = useState<MediaItemView | null>(null);

  const photos = media.filter((m) => m.mediaType === MediaType.photo).length;
  const videos = media.filter((m) => m.mediaType === MediaType.video).length;
  const audios = media.filter((m) => m.mediaType === MediaType.audio).length;

  return (
    <div data-ocid={`portfolio.project.item.${project.id.toString()}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display font-bold text-xl text-foreground">
            {project.title}
          </h3>
          {project.description && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {project.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            {photos > 0 && (
              <Badge variant="outline" className="text-[10px] gap-1 py-0">
                <Camera size={9} /> {photos}
              </Badge>
            )}
            {videos > 0 && (
              <Badge variant="outline" className="text-[10px] gap-1 py-0">
                <Film size={9} /> {videos}
              </Badge>
            )}
            {audios > 0 && (
              <Badge variant="outline" className="text-[10px] gap-1 py-0">
                <Music size={9} /> {audios}
              </Badge>
            )}
            <ProjectLikeBadge projectId={project.id} />
          </div>
        </div>
      </div>

      <MediaGrid
        items={media}
        isLoading={isLoading}
        onItemClick={setActiveMedia}
        columns={4}
        emptyState={
          <div className="h-24 rounded-xl bg-secondary/50 border border-dashed border-border flex items-center justify-center">
            <p className="text-xs text-muted-foreground">
              No media in this project
            </p>
          </div>
        }
      />

      {/* Inline lightbox */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={() => setActiveMedia(null)}
          onKeyDown={(e) => e.key === "Escape" && setActiveMedia(null)}
          data-ocid="portfolio.lightbox.dialog"
          aria-label="Media lightbox"
        >
          <button
            type="button"
            className="absolute top-4 right-4 rounded-full bg-secondary/80 backdrop-blur-sm p-2.5 text-foreground hover:bg-muted transition-smooth"
            onClick={() => setActiveMedia(null)}
            data-ocid="portfolio.lightbox.close_button"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>✕
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
                className="max-h-[80vh] max-w-full rounded-2xl object-contain"
              />
            )}
            {activeMedia.mediaType === MediaType.video && (
              <video
                src={activeMedia.blob.getDirectURL()}
                controls
                autoPlay
                className="max-h-[80vh] max-w-full rounded-2xl"
              >
                <track kind="captions" />
              </video>
            )}
            {activeMedia.mediaType === MediaType.audio && (
              <div className="flex flex-col items-center gap-5 p-10">
                <div className="rounded-full gradient-primary p-10">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  const { principal } = useParams({ from: "/portfolio/$principal" });
  const { data: portfolio, isLoading } = usePortfolio(principal);
  const { principalText, isAuthenticated } = useAuth();

  const isOwnProfile = isAuthenticated && principalText === principal;
  const { data: isFollowing = false } = useIsFollowing(
    isOwnProfile ? undefined : principal,
  );
  const { data: followerCount = 0 } = useGetFollowerCount(principal);
  const { data: followingCount = 0 } = useGetFollowingCount(principal);
  const { mutate: followUser, isPending: followPending } = useFollowUser();
  const { mutate: unfollowUser, isPending: unfollowPending } =
    useUnfollowUser();
  const [hoveringFollow, setHoveringFollow] = useState(false);

  const handleFollowToggle = () => {
    if (!isAuthenticated) {
      toast.error("Sign in to follow");
      return;
    }
    if (isFollowing) {
      unfollowUser(principal, { onSuccess: () => toast.success("Unfollowed") });
    } else {
      followUser(principal, { onSuccess: () => toast.success("Following!") });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="w-20 h-20 rounded-full bg-secondary animate-pulse" />
          <div className="h-7 w-48 bg-secondary rounded animate-pulse" />
          <div className="h-4 w-64 bg-secondary rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-secondary animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  const profile = portfolio?.profile;
  const projects = (portfolio?.projects ?? []) as ProjectView[];
  const totalMedia = portfolio?.media?.length ?? 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Back nav */}
      <Link to="/projects" className="inline-block mb-6">
        <AppButton variant="ghost" size="sm" type="button">
          <ArrowLeft size={14} /> Back
        </AppButton>
      </Link>

      {/* Profile hero */}
      <div className="rounded-3xl bg-card border border-border p-8 mb-8 flex flex-col items-center text-center">
        <AppAvatar
          name={profile?.name}
          src={profile?.avatar?.getDirectURL()}
          size="xl"
          className="mb-4 ring-2 ring-border ring-offset-2 ring-offset-card"
        />
        <h1 className="font-display font-bold text-3xl text-foreground">
          {profile?.name ?? "Artist Portfolio"}
        </h1>

        {/* Follow button — hidden if own profile */}
        {!isOwnProfile && (
          <button
            type="button"
            data-ocid="portfolio.follow_button"
            onClick={handleFollowToggle}
            disabled={followPending || unfollowPending}
            onMouseEnter={() => setHoveringFollow(true)}
            onMouseLeave={() => setHoveringFollow(false)}
            className={`mt-4 flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold border transition-smooth ${
              isFollowing
                ? hoveringFollow
                  ? "bg-transparent text-muted-foreground border-muted-foreground line-through"
                  : "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border hover:bg-secondary"
            }`}
          >
            {isFollowing ? (
              <>
                {hoveringFollow ? (
                  <UserMinus size={14} />
                ) : (
                  <UserCheck size={14} />
                )}
                {hoveringFollow ? "Unfollow" : "Following"}
              </>
            ) : (
              <>
                <UserPlus size={14} />
                Follow
              </>
            )}
          </button>
        )}

        {/* Summary stats */}
        <div className="flex items-center gap-6 mt-5 pt-5 border-t border-border w-full justify-center flex-wrap">
          <div className="text-center">
            <p className="font-display font-bold text-xl text-foreground">
              {projects.length}
            </p>
            <p className="text-xs text-muted-foreground">Projects</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="font-display font-bold text-xl text-foreground">
              {totalMedia}
            </p>
            <p className="text-xs text-muted-foreground">Media</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="font-display font-bold text-xl text-foreground">
              {followerCount}
            </p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="font-display font-bold text-xl text-foreground">
              {followingCount}
            </p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <div
          data-ocid="portfolio.empty_state"
          className="rounded-2xl border border-dashed border-border p-16 text-center"
        >
          <p className="font-display font-semibold text-foreground mb-1">
            No public projects
          </p>
          <p className="text-sm text-muted-foreground">
            This artist hasn't shared any projects yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <h2 className="font-display font-semibold text-lg text-foreground">
            Projects ({projects.length})
          </h2>
          {projects.map((project, i) => (
            <div key={project.id.toString()}>
              <ProjectSection project={project} />
              {i < projects.length - 1 && <Separator className="mt-10" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
