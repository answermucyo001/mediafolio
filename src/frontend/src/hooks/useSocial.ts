/**
 * useSocial.ts — Client-side social feature hooks.
 * Likes, comments, follows stored in localStorage until a backend social layer exists.
 */
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface CommentView {
  id: string;
  projectId: string;
  authorPrincipal: string;
  authorName?: string;
  text: string;
  createdAt: number;
}

// ─── Storage helpers ───────────────────────────────────────────────────────────

function getLikes(): Record<string, string[]> {
  try {
    return JSON.parse(localStorage.getItem("mf_likes") ?? "{}");
  } catch {
    return {};
  }
}
function saveLikes(data: Record<string, string[]>) {
  localStorage.setItem("mf_likes", JSON.stringify(data));
}
function getComments(): CommentView[] {
  try {
    return JSON.parse(localStorage.getItem("mf_comments") ?? "[]");
  } catch {
    return [];
  }
}
function saveComments(data: CommentView[]) {
  localStorage.setItem("mf_comments", JSON.stringify(data));
}
function getFollows(): Record<string, string[]> {
  try {
    return JSON.parse(localStorage.getItem("mf_follows") ?? "{}");
  } catch {
    return {};
  }
}
function saveFollows(data: Record<string, string[]>) {
  localStorage.setItem("mf_follows", JSON.stringify(data));
}

// ─── Like hooks ───────────────────────────────────────────────────────────────

export function useHasLiked(projectId: bigint | undefined) {
  const { principalText } = useAuth();
  return useQuery<boolean>({
    queryKey: ["hasLiked", projectId?.toString(), principalText],
    queryFn: () => {
      if (!projectId || !principalText) return false;
      return (getLikes()[projectId.toString()] ?? []).includes(principalText);
    },
    enabled: projectId !== undefined,
  });
}

export function useGetLikeCount(projectId: bigint | undefined) {
  return useQuery<number>({
    queryKey: ["likeCount", projectId?.toString()],
    queryFn: () => {
      if (!projectId) return 0;
      return (getLikes()[projectId.toString()] ?? []).length;
    },
    enabled: projectId !== undefined,
  });
}

/** Call mutate(projectId) to like */
export function useLikeProject() {
  const { principalText } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (projectId: bigint) => {
      if (!principalText) return;
      const likes = getLikes();
      const key = projectId.toString();
      const arr = likes[key] ?? [];
      if (!arr.includes(principalText)) likes[key] = [...arr, principalText];
      saveLikes(likes);
      return projectId;
    },
    onSuccess: (_data, projectId) => {
      queryClient.invalidateQueries({
        queryKey: ["hasLiked", projectId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["likeCount", projectId.toString()],
      });
    },
  });
}

/** Call mutate(projectId) to unlike */
export function useUnlikeProject() {
  const { principalText } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (projectId: bigint) => {
      if (!principalText) return;
      const likes = getLikes();
      const key = projectId.toString();
      likes[key] = (likes[key] ?? []).filter((p) => p !== principalText);
      saveLikes(likes);
      return projectId;
    },
    onSuccess: (_data, projectId) => {
      queryClient.invalidateQueries({
        queryKey: ["hasLiked", projectId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["likeCount", projectId.toString()],
      });
    },
  });
}

// ─── Comment hooks ────────────────────────────────────────────────────────────

export function useListComments(projectId: bigint | undefined) {
  return useQuery<CommentView[]>({
    queryKey: ["comments", projectId?.toString()],
    queryFn: () => {
      if (!projectId) return [];
      return getComments().filter((c) => c.projectId === projectId.toString());
    },
    enabled: projectId !== undefined,
  });
}

/** Call mutate({ projectId, text }) to add a comment */
export function useAddComment() {
  const { principalText } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      projectId,
      text,
    }: { projectId: bigint; text: string }) => {
      if (!principalText) throw new Error("Not authenticated");
      const comment: CommentView = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        projectId: projectId.toString(),
        authorPrincipal: principalText,
        text,
        createdAt: Date.now(),
      };
      saveComments([...getComments(), comment]);
      return comment;
    },
    onSuccess: (_data, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", projectId.toString()],
      });
    },
  });
}

/** Call mutate({ commentId, projectId }) to delete */
export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      commentId,
      projectId,
    }: { commentId: string; projectId: bigint }) => {
      saveComments(getComments().filter((c) => c.id !== commentId));
      return projectId;
    },
    onSuccess: (_data, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", projectId.toString()],
      });
    },
  });
}

// ─── Follow hooks (string-based principals) ───────────────────────────────────

export function useIsFollowing(targetPrincipal: string | undefined) {
  const { principalText } = useAuth();
  return useQuery<boolean>({
    queryKey: ["isFollowing", principalText, targetPrincipal],
    queryFn: () => {
      if (!targetPrincipal || !principalText) return false;
      return (getFollows()[principalText] ?? []).includes(targetPrincipal);
    },
    enabled: !!targetPrincipal,
  });
}

export function useGetFollowerCount(targetPrincipal: string | undefined) {
  return useQuery<number>({
    queryKey: ["followerCount", targetPrincipal],
    queryFn: () => {
      if (!targetPrincipal) return 0;
      return Object.values(getFollows()).filter((arr) =>
        arr.includes(targetPrincipal),
      ).length;
    },
    enabled: !!targetPrincipal,
  });
}

export function useGetFollowingCount(targetPrincipal: string | undefined) {
  return useQuery<number>({
    queryKey: ["followingCount", targetPrincipal],
    queryFn: () => {
      if (!targetPrincipal) return 0;
      return (getFollows()[targetPrincipal] ?? []).length;
    },
    enabled: !!targetPrincipal,
  });
}

/** Call mutate(targetPrincipalString) to follow */
export function useFollowUser() {
  const { principalText } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (target: string) => {
      if (!principalText) throw new Error("Not authenticated");
      const follows = getFollows();
      const arr = follows[principalText] ?? [];
      if (!arr.includes(target)) follows[principalText] = [...arr, target];
      saveFollows(follows);
      return target;
    },
    onSuccess: (target) => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", principalText, target],
      });
      queryClient.invalidateQueries({ queryKey: ["followerCount", target] });
      queryClient.invalidateQueries({
        queryKey: ["followingCount", principalText],
      });
    },
  });
}

/** Call mutate(targetPrincipalString) to unfollow */
export function useUnfollowUser() {
  const { principalText } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (target: string) => {
      if (!principalText) throw new Error("Not authenticated");
      const follows = getFollows();
      follows[principalText] = (follows[principalText] ?? []).filter(
        (p) => p !== target,
      );
      saveFollows(follows);
      return target;
    },
    onSuccess: (target) => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", principalText, target],
      });
      queryClient.invalidateQueries({ queryKey: ["followerCount", target] });
      queryClient.invalidateQueries({
        queryKey: ["followingCount", principalText],
      });
    },
  });
}
