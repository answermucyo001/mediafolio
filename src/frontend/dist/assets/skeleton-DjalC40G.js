import { c as createLucideIcon, j as jsxRuntimeExports, S as Slot, b as cn, M as MediaType, v as useActor, w as useQuery, x as useQueryClient, y as useMutation, E as ExternalBlob, z as createActor, u as useAuth } from "./index-BMKmhz2w.js";
import { c as cva } from "./index-Ba0MObz_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
];
const Film = createLucideIcon("film", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode);
const extendedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-display font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-subtle",
        hero: "gradient-primary text-primary-foreground shadow-elevated hover:opacity-90 text-base",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-primary/40",
        ghost: "text-foreground hover:bg-secondary hover:text-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        upload: "gradient-primary text-primary-foreground shadow-card hover:opacity-90 w-full",
        icon: "bg-secondary text-foreground hover:bg-muted border border-border rounded-lg"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-5 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function AppButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      className: cn(extendedButtonVariants({ variant, size, className })),
      ...props
    }
  );
}
function isVideoFile(filename) {
  return /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(filename);
}
function isAudioFile(filename) {
  return /\.(mp3|wav|ogg|flac|aac|m4a)$/i.test(filename);
}
function mediaTypeFromFile(filename) {
  if (isVideoFile(filename)) return MediaType.video;
  if (isAudioFile(filename)) return MediaType.audio;
  return MediaType.photo;
}
function useProjectMedia(projectId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["projectMedia", projectId == null ? void 0 : projectId.toString()],
    queryFn: async () => {
      if (!actor || projectId === void 0) return [];
      const result = await actor.listProjectMedia(projectId);
      return result ?? [];
    },
    enabled: !!actor && !actorFetching && projectId !== void 0
  });
}
function useAddMedia() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      projectId,
      file,
      caption,
      onProgress
    }) => {
      if (!actor) throw new Error("Not connected");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) blob.withUploadProgress(onProgress);
      const mediaType = mediaTypeFromFile(file.name);
      return actor.addMedia(projectId, file.name, mediaType, blob, caption);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projectMedia", variables.projectId.toString()]
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}
function useDeleteMedia() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      mediaId,
      projectId: _projectId
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteMedia(mediaId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projectMedia", variables.projectId.toString()]
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}
function getLikes() {
  try {
    return JSON.parse(localStorage.getItem("mf_likes") ?? "{}");
  } catch {
    return {};
  }
}
function saveLikes(data) {
  localStorage.setItem("mf_likes", JSON.stringify(data));
}
function getComments() {
  try {
    return JSON.parse(localStorage.getItem("mf_comments") ?? "[]");
  } catch {
    return [];
  }
}
function saveComments(data) {
  localStorage.setItem("mf_comments", JSON.stringify(data));
}
function getFollows() {
  try {
    return JSON.parse(localStorage.getItem("mf_follows") ?? "{}");
  } catch {
    return {};
  }
}
function saveFollows(data) {
  localStorage.setItem("mf_follows", JSON.stringify(data));
}
function useHasLiked(projectId) {
  const { principalText } = useAuth();
  return useQuery({
    queryKey: ["hasLiked", projectId == null ? void 0 : projectId.toString(), principalText],
    queryFn: () => {
      if (!projectId || !principalText) return false;
      return (getLikes()[projectId.toString()] ?? []).includes(principalText);
    },
    enabled: projectId !== void 0
  });
}
function useGetLikeCount(projectId) {
  return useQuery({
    queryKey: ["likeCount", projectId == null ? void 0 : projectId.toString()],
    queryFn: () => {
      if (!projectId) return 0;
      return (getLikes()[projectId.toString()] ?? []).length;
    },
    enabled: projectId !== void 0
  });
}
function useLikeProject() {
  const { principalText } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (projectId) => {
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
        queryKey: ["hasLiked", projectId.toString()]
      });
      queryClient.invalidateQueries({
        queryKey: ["likeCount", projectId.toString()]
      });
    }
  });
}
function useUnlikeProject() {
  const { principalText } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (projectId) => {
      if (!principalText) return;
      const likes = getLikes();
      const key = projectId.toString();
      likes[key] = (likes[key] ?? []).filter((p) => p !== principalText);
      saveLikes(likes);
      return projectId;
    },
    onSuccess: (_data, projectId) => {
      queryClient.invalidateQueries({
        queryKey: ["hasLiked", projectId.toString()]
      });
      queryClient.invalidateQueries({
        queryKey: ["likeCount", projectId.toString()]
      });
    }
  });
}
function useListComments(projectId) {
  return useQuery({
    queryKey: ["comments", projectId == null ? void 0 : projectId.toString()],
    queryFn: () => {
      if (!projectId) return [];
      return getComments().filter((c) => c.projectId === projectId.toString());
    },
    enabled: projectId !== void 0
  });
}
function useAddComment() {
  const { principalText } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      projectId,
      text
    }) => {
      if (!principalText) throw new Error("Not authenticated");
      const comment = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        projectId: projectId.toString(),
        authorPrincipal: principalText,
        text,
        createdAt: Date.now()
      };
      saveComments([...getComments(), comment]);
      return comment;
    },
    onSuccess: (_data, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", projectId.toString()]
      });
    }
  });
}
function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      commentId,
      projectId
    }) => {
      saveComments(getComments().filter((c) => c.id !== commentId));
      return projectId;
    },
    onSuccess: (_data, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", projectId.toString()]
      });
    }
  });
}
function useIsFollowing(targetPrincipal) {
  const { principalText } = useAuth();
  return useQuery({
    queryKey: ["isFollowing", principalText, targetPrincipal],
    queryFn: () => {
      if (!targetPrincipal || !principalText) return false;
      return (getFollows()[principalText] ?? []).includes(targetPrincipal);
    },
    enabled: !!targetPrincipal
  });
}
function useGetFollowerCount(targetPrincipal) {
  return useQuery({
    queryKey: ["followerCount", targetPrincipal],
    queryFn: () => {
      if (!targetPrincipal) return 0;
      return Object.values(getFollows()).filter(
        (arr) => arr.includes(targetPrincipal)
      ).length;
    },
    enabled: !!targetPrincipal
  });
}
function useGetFollowingCount(targetPrincipal) {
  return useQuery({
    queryKey: ["followingCount", targetPrincipal],
    queryFn: () => {
      if (!targetPrincipal) return 0;
      return (getFollows()[targetPrincipal] ?? []).length;
    },
    enabled: !!targetPrincipal
  });
}
function useFollowUser() {
  const { principalText } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (target) => {
      if (!principalText) throw new Error("Not authenticated");
      const follows = getFollows();
      const arr = follows[principalText] ?? [];
      if (!arr.includes(target)) follows[principalText] = [...arr, target];
      saveFollows(follows);
      return target;
    },
    onSuccess: (target) => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", principalText, target]
      });
      queryClient.invalidateQueries({ queryKey: ["followerCount", target] });
      queryClient.invalidateQueries({
        queryKey: ["followingCount", principalText]
      });
    }
  });
}
function useUnfollowUser() {
  const { principalText } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (target) => {
      if (!principalText) throw new Error("Not authenticated");
      const follows = getFollows();
      follows[principalText] = (follows[principalText] ?? []).filter(
        (p) => p !== target
      );
      saveFollows(follows);
      return target;
    },
    onSuccess: (target) => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", principalText, target]
      });
      queryClient.invalidateQueries({ queryKey: ["followerCount", target] });
      queryClient.invalidateQueries({
        queryKey: ["followingCount", principalText]
      });
    }
  });
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
export {
  AppButton as A,
  Film as F,
  Heart as H,
  Skeleton as S,
  useGetLikeCount as a,
  useListComments as b,
  useAddMedia as c,
  useDeleteMedia as d,
  useHasLiked as e,
  useLikeProject as f,
  useUnlikeProject as g,
  useAddComment as h,
  useDeleteComment as i,
  useIsFollowing as j,
  useGetFollowerCount as k,
  useGetFollowingCount as l,
  useFollowUser as m,
  useUnfollowUser as n,
  useProjectMedia as u
};
