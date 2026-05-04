import { c as createLucideIcon, j as jsxRuntimeExports, S as Slot, b as cn, k as useParams, t as usePortfolio, u as useAuth, r as reactExports, L as Link, A as AppAvatar, g as ue, M as MediaType } from "./index-BMKmhz2w.js";
import { j as useIsFollowing, k as useGetFollowerCount, l as useGetFollowingCount, m as useFollowUser, n as useUnfollowUser, A as AppButton, u as useProjectMedia, F as Film, a as useGetLikeCount, H as Heart } from "./skeleton-DjalC40G.js";
import { A as ArrowLeft, S as Separator, M as MediaGrid } from "./separator-B8Hy6dBE.js";
import { c as cva, C as Camera, M as Music } from "./index-Ba0MObz_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserMinus = createLucideIcon("user-minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function ProjectLikeBadge({ projectId }) {
  const { data: likeCount = 0 } = useGetLikeCount(projectId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px] gap-1 py-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 9 }),
    " ",
    likeCount
  ] });
}
function ProjectSection({ project }) {
  const { data: media = [], isLoading } = useProjectMedia(project.id);
  const [activeMedia, setActiveMedia] = reactExports.useState(null);
  const photos = media.filter((m) => m.mediaType === MediaType.photo).length;
  const videos = media.filter((m) => m.mediaType === MediaType.video).length;
  const audios = media.filter((m) => m.mediaType === MediaType.audio).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": `portfolio.project.item.${project.id.toString()}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground", children: project.title }),
      project.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: project.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
        photos > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px] gap-1 py-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 9 }),
          " ",
          photos
        ] }),
        videos > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px] gap-1 py-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { size: 9 }),
          " ",
          videos
        ] }),
        audios > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px] gap-1 py-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 9 }),
          " ",
          audios
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectLikeBadge, { projectId: project.id })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MediaGrid,
      {
        items: media,
        isLoading,
        onItemClick: setActiveMedia,
        columns: 4,
        emptyState: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-xl bg-secondary/50 border border-dashed border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No media in this project" }) })
      }
    ),
    activeMedia && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4",
        onClick: () => setActiveMedia(null),
        onKeyDown: (e) => e.key === "Escape" && setActiveMedia(null),
        "data-ocid": "portfolio.lightbox.dialog",
        "aria-label": "Media lightbox",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "absolute top-4 right-4 rounded-full bg-secondary/80 backdrop-blur-sm p-2.5 text-foreground hover:bg-muted transition-smooth",
              onClick: () => setActiveMedia(null),
              "data-ocid": "portfolio.lightbox.close_button",
              "aria-label": "Close",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" }),
                "✕"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "max-w-4xl max-h-[90vh] w-full flex flex-col items-center gap-4",
              onClick: (e) => e.stopPropagation(),
              onKeyDown: (e) => e.stopPropagation(),
              children: [
                activeMedia.mediaType === MediaType.photo && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: activeMedia.blob.getDirectURL(),
                    alt: activeMedia.name,
                    className: "max-h-[80vh] max-w-full rounded-2xl object-contain"
                  }
                ),
                activeMedia.mediaType === MediaType.video && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "video",
                  {
                    src: activeMedia.blob.getDirectURL(),
                    controls: true,
                    autoPlay: true,
                    className: "max-h-[80vh] max-w-full rounded-2xl",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
                  }
                ),
                activeMedia.mediaType === MediaType.audio && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5 p-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full gradient-primary p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 44, className: "text-primary-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg text-foreground", children: activeMedia.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "audio",
                    {
                      src: activeMedia.blob.getDirectURL(),
                      controls: true,
                      className: "w-full",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function PortfolioPage() {
  var _a, _b;
  const { principal } = useParams({ from: "/portfolio/$principal" });
  const { data: portfolio, isLoading } = usePortfolio(principal);
  const { principalText, isAuthenticated } = useAuth();
  const isOwnProfile = isAuthenticated && principalText === principal;
  const { data: isFollowing = false } = useIsFollowing(
    isOwnProfile ? void 0 : principal
  );
  const { data: followerCount = 0 } = useGetFollowerCount(principal);
  const { data: followingCount = 0 } = useGetFollowingCount(principal);
  const { mutate: followUser, isPending: followPending } = useFollowUser();
  const { mutate: unfollowUser, isPending: unfollowPending } = useUnfollowUser();
  const [hoveringFollow, setHoveringFollow] = reactExports.useState(false);
  const handleFollowToggle = () => {
    if (!isAuthenticated) {
      ue.error("Sign in to follow");
      return;
    }
    if (isFollowing) {
      unfollowUser(principal, { onSuccess: () => ue.success("Unfollowed") });
    } else {
      followUser(principal, { onSuccess: () => ue.success("Following!") });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-secondary animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-48 bg-secondary rounded animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-64 bg-secondary rounded animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-48 rounded-2xl bg-secondary animate-pulse"
        },
        i
      )) })
    ] });
  }
  const profile = portfolio == null ? void 0 : portfolio.profile;
  const projects = (portfolio == null ? void 0 : portfolio.projects) ?? [];
  const totalMedia = ((_a = portfolio == null ? void 0 : portfolio.media) == null ? void 0 : _a.length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", className: "inline-block mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AppButton, { variant: "ghost", size: "sm", type: "button", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
      " Back"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-8 mb-8 flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppAvatar,
        {
          name: profile == null ? void 0 : profile.name,
          src: (_b = profile == null ? void 0 : profile.avatar) == null ? void 0 : _b.getDirectURL(),
          size: "xl",
          className: "mb-4 ring-2 ring-border ring-offset-2 ring-offset-card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: (profile == null ? void 0 : profile.name) ?? "Artist Portfolio" }),
      !isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "portfolio.follow_button",
          onClick: handleFollowToggle,
          disabled: followPending || unfollowPending,
          onMouseEnter: () => setHoveringFollow(true),
          onMouseLeave: () => setHoveringFollow(false),
          className: `mt-4 flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold border transition-smooth ${isFollowing ? hoveringFollow ? "bg-transparent text-muted-foreground border-muted-foreground line-through" : "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border hover:bg-secondary"}`,
          children: isFollowing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            hoveringFollow ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 14 }),
            hoveringFollow ? "Unfollow" : "Following"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 14 }),
            "Follow"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 mt-5 pt-5 border-t border-border w-full justify-center flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: projects.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Projects" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: totalMedia }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Media" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: followerCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Followers" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: followingCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Following" })
        ] })
      ] })
    ] }),
    projects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "portfolio.empty_state",
        className: "rounded-2xl border border-dashed border-border p-16 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No public projects" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This artist hasn't shared any projects yet." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground", children: [
        "Projects (",
        projects.length,
        ")"
      ] }),
      projects.map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectSection, { project }),
        i < projects.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mt-10" })
      ] }, project.id.toString()))
    ] })
  ] });
}
export {
  PortfolioPage as default
};
