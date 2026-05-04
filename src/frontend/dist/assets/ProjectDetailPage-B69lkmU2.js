import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, r as reactExports, P as Primitive, i as createContextScope, X, k as useParams, u as useAuth, l as useProject, L as Link, M as MediaType, g as ue } from "./index-BMKmhz2w.js";
import { u as useProjectMedia, c as useAddMedia, d as useDeleteMedia, e as useHasLiked, a as useGetLikeCount, f as useLikeProject, g as useUnlikeProject, b as useListComments, h as useAddComment, i as useDeleteComment, A as AppButton, H as Heart } from "./skeleton-DjalC40G.js";
import { M as MessageCircle, T as Trash2, A as AppModal } from "./AppModal-jcXAv84P.js";
import { A as ArrowLeft, M as MediaGrid, S as Separator } from "./separator-B8Hy6dBE.js";
import { B as Button } from "./button-CC6nT-QQ.js";
import { U as Upload } from "./upload-BpsWwIG4.js";
import { M as Music } from "./index-Ba0MObz_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
const CloudUpload = createLucideIcon("cloud-upload", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }]
];
const File = createLucideIcon("file", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function AppProgressBar({
  value,
  className,
  label,
  showLabel = false
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("w-full", className), children: [
    (showLabel || label) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-1.5", children: [
      label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
      showLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-primary", children: [
        clamped,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full gradient-primary transition-all duration-300 ease-out",
        style: { width: `${clamped}%` }
      }
    ) })
  ] });
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function UploadZone({
  onFiles,
  uploading = false,
  progress = 0,
  accept = "image/*,video/*,audio/*",
  multiple = true,
  className
}) {
  const [dragActive, setDragActive] = reactExports.useState(false);
  const [queue, setQueue] = reactExports.useState([]);
  const inputRef = reactExports.useRef(null);
  const buildQueue = reactExports.useCallback(
    (files) => files.map((file) => ({ file, progress: 0, status: "pending" })),
    []
  );
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (!files.length) return;
    setQueue(buildQueue(files));
    onFiles(files);
  };
  const handleChange = (e) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setQueue(buildQueue(files));
    onFiles(files);
    e.target.value = "";
  };
  const doneCount = uploading ? Math.floor(progress / 100 * queue.length) : queue.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-4", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        tabIndex: 0,
        "data-ocid": "upload.dropzone",
        "aria-label": "Drop files here or click to browse",
        className: cn(
          "relative rounded-2xl border-2 border-dashed transition-smooth cursor-pointer w-full text-left",
          dragActive ? "border-foreground bg-secondary scale-[1.01]" : "border-border hover:border-foreground/50 hover:bg-secondary/50",
          uploading && "pointer-events-none opacity-70"
        ),
        onDragEnter: handleDrag,
        onDragLeave: handleDrag,
        onDragOver: handleDrag,
        onDrop: handleDrop,
        onClick: () => {
          var _a;
          return !uploading && ((_a = inputRef.current) == null ? void 0 : _a.click());
        },
        onKeyDown: (e) => {
          var _a;
          return (e.key === "Enter" || e.key === " ") && !uploading && ((_a = inputRef.current) == null ? void 0 : _a.click());
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: inputRef,
              type: "file",
              accept,
              multiple,
              className: "hidden",
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-10 px-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "rounded-full p-4 transition-smooth",
                  dragActive ? "bg-foreground" : "bg-secondary"
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CloudUpload,
                  {
                    size: 28,
                    className: cn(
                      dragActive ? "text-background" : "text-muted-foreground"
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: dragActive ? "Drop to upload" : "Drop files here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Photos, videos, and audio — no limit" })
            ] }),
            !dragActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "upload.upload_button",
                variant: "default",
                size: "sm",
                type: "button",
                className: "mt-1 w-36 gradient-primary text-primary-foreground hover:opacity-90",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 14 }),
                  " Browse files"
                ]
              }
            )
          ] })
        ]
      }
    ),
    queue.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          queue.length,
          " file",
          queue.length !== 1 ? "s" : "",
          " selected"
        ] }),
        uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          doneCount,
          " / ",
          queue.length,
          " done"
        ] })
      ] }),
      uploading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-1.5 bg-secondary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-48 overflow-y-auto flex flex-col gap-1.5 pr-1", children: queue.map((item, i) => {
        const isDone = i < doneCount;
        const isActive = uploading && i === doneCount;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `upload.queue.item.${i + 1}`,
            className: "flex items-center gap-2.5 rounded-lg bg-secondary/60 px-3 py-2 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(File, { size: 13, className: "text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-foreground min-w-0", children: item.file.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: formatFileSize(item.file.size) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14, className: "text-foreground" }) : isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                LoaderCircle,
                {
                  size: 14,
                  className: "text-foreground animate-spin"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "text-muted-foreground" }) })
            ]
          },
          `${item.file.name}-${i}`
        );
      }) })
    ] })
  ] });
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function formatRelativeTime(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "just now";
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} day${d === 1 ? "" : "s"} ago`;
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function truncatePrincipal(p, len = 12) {
  return p.length > len ? `${p.slice(0, 6)}…${p.slice(-4)}` : p;
}
function ProjectDetailPage() {
  const { id } = useParams({ from: "/app-layout/projects/$id" });
  const projectId = BigInt(id);
  const { isAuthenticated, principalText } = useAuth();
  const { data: project, isLoading: projectLoading } = useProject(projectId);
  const { data: media = [], isLoading: mediaLoading } = useProjectMedia(projectId);
  const { mutateAsync: addMedia } = useAddMedia();
  const { mutate: deleteMedia } = useDeleteMedia();
  const { data: hasLiked = false } = useHasLiked(projectId);
  const { data: likeCount = 0 } = useGetLikeCount(projectId);
  const { mutate: likeProject } = useLikeProject();
  const { mutate: unlikeProject } = useUnlikeProject();
  const { data: comments = [] } = useListComments(projectId);
  const { mutate: addComment, isPending: addingComment } = useAddComment();
  const { mutate: deleteComment } = useDeleteComment();
  const [showUpload, setShowUpload] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [activeMedia, setActiveMedia] = reactExports.useState(null);
  const [commentText, setCommentText] = reactExports.useState("");
  const commentInputRef = reactExports.useRef(null);
  const handleFiles = async (files) => {
    setUploading(true);
    setUploadProgress(0);
    try {
      for (const file of files) {
        await addMedia({
          projectId,
          file,
          caption: "",
          onProgress: setUploadProgress
        });
      }
      ue.success(
        `${files.length} file${files.length > 1 ? "s" : ""} uploaded`
      );
      setShowUpload(false);
    } catch {
      ue.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };
  const handleDelete = (item) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    deleteMedia(
      { mediaId: item.id, projectId },
      {
        onSuccess: () => ue.success("Media deleted"),
        onError: () => ue.error("Failed to delete")
      }
    );
  };
  const handleToggleLike = () => {
    if (!isAuthenticated) {
      ue.error("Sign in to like");
      return;
    }
    if (hasLiked) unlikeProject(projectId);
    else likeProject(projectId);
  };
  const handleSubmitComment = () => {
    const text = commentText.trim();
    if (!text) return;
    if (!isAuthenticated) {
      ue.error("Sign in to comment");
      return;
    }
    addComment(
      { projectId, text },
      {
        onSuccess: () => {
          setCommentText("");
          ue.success("Comment added");
        },
        onError: () => ue.error("Failed to add comment")
      }
    );
  };
  const handleDeleteComment = (commentId) => {
    deleteComment(
      { commentId, projectId },
      { onSuccess: () => ue.success("Comment deleted") }
    );
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sign in to view projects" }) });
  }
  if (projectLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-48 bg-secondary rounded animate-pulse mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3", children: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "aspect-square rounded-xl bg-secondary animate-pulse"
        },
        i
      )) })
    ] });
  }
  if (!project) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-4 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-display font-semibold", children: "Project not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AppButton, { variant: "outline", type: "button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
        " Back to Projects"
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          AppButton,
          {
            variant: "ghost",
            size: "icon",
            type: "button",
            "aria-label": "Back",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground leading-tight", children: project.title }),
          project.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: project.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            media.length,
            " item",
            media.length !== 1 ? "s" : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "project.like_button",
            onClick: handleToggleLike,
            "aria-label": hasLiked ? "Unlike" : "Like",
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm font-medium transition-smooth hover:bg-secondary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  size: 15,
                  className: hasLiked ? "fill-foreground text-foreground" : "text-muted-foreground"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: hasLiked ? "text-foreground" : "text-muted-foreground",
                  children: likeCount
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AppButton,
          {
            variant: "default",
            onClick: () => setShowUpload(true),
            "data-ocid": "project.upload.button",
            type: "button",
            className: "gradient-primary text-primary-foreground hover:opacity-90",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
              " Upload"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MediaGrid,
      {
        items: media,
        isLoading: mediaLoading,
        onItemClick: setActiveMedia,
        onDeleteItem: handleDelete,
        columns: 4,
        emptyState: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "project.media.empty_state",
            className: "rounded-2xl border border-dashed border-border py-16 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-2", children: "No media yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Upload photos, videos, or audio files to this project" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                AppButton,
                {
                  variant: "default",
                  onClick: () => setShowUpload(true),
                  "data-ocid": "project.upload_first.button",
                  type: "button",
                  className: "gradient-primary text-primary-foreground hover:opacity-90 mx-auto",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
                    " Upload Files"
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "project.comments.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18, className: "text-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground", children: [
          "Comments",
          comments.length > 0 ? ` (${comments.length})` : ""
        ] })
      ] }),
      isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            ref: commentInputRef,
            "data-ocid": "project.comment.input",
            placeholder: "Write a comment…",
            value: commentText,
            onChange: (e) => setCommentText(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey))
                handleSubmitComment();
            },
            rows: 2,
            className: "resize-none flex-1 bg-secondary/40 border-border text-foreground placeholder:text-muted-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AppButton,
          {
            type: "button",
            variant: "default",
            onClick: handleSubmitComment,
            disabled: !commentText.trim() || addingComment,
            "data-ocid": "project.comment.submit_button",
            className: "self-end gradient-primary text-primary-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 14 }),
              " Post"
            ]
          }
        )
      ] }),
      !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Sign in to leave a comment." }),
      comments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "project.comments.empty_state",
          className: "rounded-xl border border-dashed border-border py-10 text-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No comments yet. Be the first!" })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: comments.map((comment, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `project.comment.item.${i + 1}`,
          className: "flex gap-3 group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 text-xs font-mono text-muted-foreground", children: comment.authorPrincipal.slice(0, 2).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: comment.authorName ?? truncatePrincipal(comment.authorPrincipal) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatRelativeTime(Number(comment.createdAt)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mt-0.5 break-words", children: comment.text })
            ] }),
            comment.authorPrincipal === principalText && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => handleDeleteComment(comment.id),
                "data-ocid": `project.comment.delete_button.${i + 1}`,
                "aria-label": "Delete comment",
                className: "opacity-0 group-hover:opacity-100 p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth self-start",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
              }
            )
          ]
        },
        comment.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      AppModal,
      {
        open: showUpload,
        onOpenChange: setShowUpload,
        title: "Upload Media",
        description: "Add photos, videos, or audio to this project",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            UploadZone,
            {
              onFiles: handleFiles,
              uploading,
              progress: uploadProgress
            }
          ),
          uploading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppProgressBar,
            {
              value: uploadProgress,
              showLabel: true,
              label: "Uploading..."
            }
          ) })
        ]
      }
    ),
    activeMedia && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4",
        onClick: () => setActiveMedia(null),
        onKeyDown: (e) => e.key === "Escape" && setActiveMedia(null),
        "data-ocid": "project.lightbox.dialog",
        "aria-label": "Media lightbox",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "absolute top-4 right-4 rounded-full bg-secondary/80 backdrop-blur-sm p-2.5 text-foreground hover:bg-muted transition-smooth",
              onClick: () => setActiveMedia(null),
              "data-ocid": "project.lightbox.close_button",
              "aria-label": "Close lightbox",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
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
                    className: "max-h-[80vh] max-w-full rounded-2xl object-contain shadow-elevated"
                  }
                ),
                activeMedia.mediaType === MediaType.video && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "video",
                  {
                    src: activeMedia.blob.getDirectURL(),
                    controls: true,
                    autoPlay: true,
                    className: "max-h-[80vh] max-w-full rounded-2xl shadow-elevated",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
                  }
                ),
                activeMedia.mediaType === MediaType.audio && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5 p-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full gradient-primary p-10 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 44, className: "text-primary-foreground" }) }),
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
                ] }),
                activeMedia.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: activeMedia.caption })
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  ProjectDetailPage as default
};
