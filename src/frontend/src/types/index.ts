// Re-export backend types so pages import from one place
export type {
  ExternalBlob,
  MediaItemView,
  MediaType,
  PortfolioView,
  ProjectView,
  UserProfile,
} from "@/backend";
export { MediaType as MediaTypeEnum } from "@/backend";

import { MediaType } from "@/backend";

// Derived helpers
export type MediaCategory = "photo" | "video" | "audio";

export function getMediaCategory(mediaType: MediaType): MediaCategory {
  if (mediaType === MediaType.photo) return "photo";
  if (mediaType === MediaType.video) return "video";
  return "audio";
}

export function isImageFile(filename: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg|bmp|avif)$/i.test(filename);
}

export function isVideoFile(filename: string): boolean {
  return /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(filename);
}

export function isAudioFile(filename: string): boolean {
  return /\.(mp3|wav|ogg|flac|aac|m4a)$/i.test(filename);
}

export function mediaTypeFromFile(filename: string): MediaType {
  if (isVideoFile(filename)) return MediaType.video;
  if (isAudioFile(filename)) return MediaType.audio;
  return MediaType.photo;
}

// Social feature types
export interface CommentView {
  id: string;
  projectId: bigint;
  authorPrincipal: string;
  authorName?: string;
  text: string;
  createdAt: bigint;
}

export interface SocialStats {
  likeCount: number;
  commentCount: number;
  followerCount: number;
  followingCount: number;
  hasLiked: boolean;
  isFollowing: boolean;
}
