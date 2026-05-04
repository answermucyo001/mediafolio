import { u as useAuth, d as useProjects, f as useDeleteProject, r as reactExports, j as jsxRuntimeExports, F as FolderOpen, g as ue } from "./index-BMKmhz2w.js";
import { A as AppButton, S as Skeleton } from "./skeleton-DjalC40G.js";
import { P as Plus, a as ProjectCard, N as NewProjectModal } from "./ProjectCard-BuYwAmvW.js";
import "./index-Ba0MObz_.js";
import "./AppModal-jcXAv84P.js";
import "./button-CC6nT-QQ.js";
function ProjectsPage() {
  const { isAuthenticated, login, isLoggingIn } = useAuth();
  const { data: projects = [], isLoading } = useProjects();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const [showNewProject, setShowNewProject] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-5 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 44, className: "text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-semibold text-foreground", children: "Sign in to view your projects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your creative portfolio awaits" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppButton,
        {
          variant: "default",
          className: "gradient-primary text-primary-foreground hover:opacity-90",
          onClick: login,
          disabled: isLoggingIn,
          "data-ocid": "projects.login.button",
          type: "button",
          children: "Sign In"
        }
      )
    ] });
  }
  const handleDelete = (project) => {
    if (!confirm(`Delete project "${project.title}"? This cannot be undone.`))
      return;
    setDeletingId(project.id);
    deleteProject(project.id, {
      onSuccess: () => {
        ue.success("Project deleted");
        setDeletingId(null);
      },
      onError: () => {
        ue.error("Failed to delete project");
        setDeletingId(null);
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Projects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: isLoading ? "Loading..." : `${projects.length} project${projects.length !== 1 ? "s" : ""}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        AppButton,
        {
          variant: "default",
          className: "gradient-primary text-primary-foreground hover:opacity-90",
          onClick: () => setShowNewProject(true),
          "data-ocid": "projects.new_project.button",
          type: "button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " New Project"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" }, i)) }) : projects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "projects.empty_state",
        className: "rounded-2xl border border-dashed border-border p-16 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FolderOpen,
            {
              size: 44,
              className: "text-muted-foreground mx-auto mb-4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground mb-2", children: "No projects yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Create a project to organize your photos, videos, and audio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AppButton,
            {
              variant: "default",
              size: "lg",
              className: "gradient-primary text-primary-foreground hover:opacity-90",
              onClick: () => setShowNewProject(true),
              "data-ocid": "projects.create_first.button",
              type: "button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }),
                " Create your first project"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: projects.map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProjectCard,
      {
        project,
        index: i + 1,
        onDelete: handleDelete,
        isDeleting: isDeleting && deletingId === project.id
      },
      project.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewProjectModal, { open: showNewProject, onOpenChange: setShowNewProject })
  ] });
}
export {
  ProjectsPage as default
};
