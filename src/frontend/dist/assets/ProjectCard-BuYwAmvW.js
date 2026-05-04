import { c as createLucideIcon, r as reactExports, h as useCreateProject, a as useNavigate, j as jsxRuntimeExports, g as ue, L as Link, M as MediaType } from "./index-BMKmhz2w.js";
import { A as AppModal, T as Trash2, M as MessageCircle } from "./AppModal-jcXAv84P.js";
import { B as Button } from "./button-CC6nT-QQ.js";
import { A as AppButton, u as useProjectMedia, F as Film, a as useGetLikeCount, b as useListComments, H as Heart } from "./skeleton-DjalC40G.js";
import { C as Camera, M as Music } from "./index-Ba0MObz_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
function NewProjectModal({ open, onOpenChange }) {
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const { mutateAsync, isPending } = useCreateProject();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const project = await mutateAsync({
        title: title.trim(),
        description: description.trim()
      });
      ue.success("Project created");
      onOpenChange(false);
      setTitle("");
      setDescription("");
      navigate({ to: "/projects/$id", params: { id: project.id.toString() } });
    } catch {
      ue.error("Failed to create project");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppModal,
    {
      open,
      onOpenChange,
      title: "New Project",
      description: "Create a project to organize your media",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "project-title",
              className: "text-sm font-display font-medium text-foreground",
              children: "Title"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "project-title",
              "data-ocid": "new_project.title.input",
              className: "w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              placeholder: "e.g. Summer Portraits 2025",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              required: true,
              maxLength: 120
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "project-description",
              className: "text-sm font-display font-medium text-foreground",
              children: [
                "Description",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1", children: "(optional)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "project-description",
              "data-ocid": "new_project.description.textarea",
              className: "w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none",
              placeholder: "What's this project about?",
              rows: 3,
              value: description,
              onChange: (e) => setDescription(e.target.value),
              maxLength: 500
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => onOpenChange(false),
              "data-ocid": "new_project.cancel.button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              variant: "default",
              className: "gradient-primary text-primary-foreground hover:opacity-90",
              disabled: isPending || !title.trim(),
              "data-ocid": "new_project.submit.button",
              children: isPending ? "Creating..." : "Create Project"
            }
          )
        ] })
      ] })
    }
  );
}
function CoverImage({ projectId }) {
  const { data: media = [] } = useProjectMedia(projectId);
  const photos = media.filter((m) => m.mediaType === MediaType.photo);
  const cover = photos[0] ?? media[0];
  if (!cover) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-2 bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 opacity-30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 16, className: "text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { size: 16, className: "text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 16, className: "text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "No media yet" })
    ] });
  }
  const isPhoto = cover.mediaType === MediaType.photo;
  const url = cover.blob.getDirectURL();
  return isPhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: url,
      alt: cover.name,
      className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
      loading: "lazy"
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-secondary", children: cover.mediaType === MediaType.video ? /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { size: 28, className: "text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 28, className: "text-muted-foreground" }) });
}
function formatDate(ts) {
  const ms = Number(ts / 1000000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function SocialBadges({ projectId }) {
  const { data: likeCount = 0 } = useGetLikeCount(projectId);
  const { data: comments = [] } = useListComments(projectId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 11 }),
      " ",
      likeCount
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 11 }),
      " ",
      comments.length
    ] })
  ] });
}
function ProjectCard({
  project,
  index,
  onDelete,
  isDeleting
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `projects.item.${index}`,
      className: "group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-smooth hover:shadow-elevated",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/projects/$id",
            params: { id: project.id.toString() },
            "data-ocid": `projects.item.${index}.link`,
            className: "block",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden h-44", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CoverImage, { projectId: project.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground truncate leading-snug", children: project.title }),
                project.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed", children: project.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(project.createdAt) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SocialBadges, { projectId: project.id })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AppButton,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => onDelete(project),
            disabled: isDeleting,
            "data-ocid": `projects.delete_button.${index}`,
            type: "button",
            className: "text-destructive hover:text-destructive hover:bg-destructive/10 w-full text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 }),
              " Delete project"
            ]
          }
        ) })
      ]
    }
  );
}
export {
  NewProjectModal as N,
  Plus as P,
  ProjectCard as a
};
