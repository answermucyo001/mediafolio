import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, u as useAuth, d as useProjects, e as useUserProfile, r as reactExports, f as useDeleteProject, a as useNavigate, A as AppAvatar, F as FolderOpen, L as Link } from "./index-BMKmhz2w.js";
import { A as AppButton, S as Skeleton } from "./skeleton-DjalC40G.js";
import { P as Plus, a as ProjectCard, N as NewProjectModal } from "./ProjectCard-BuYwAmvW.js";
import "./index-Ba0MObz_.js";
import "./AppModal-jcXAv84P.js";
import "./button-CC6nT-QQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function DashboardPage() {
  var _a;
  const { isAuthenticated, isInitializing, principalText } = useAuth();
  const { data: projects = [], isLoading } = useProjects();
  const profile = useUserProfile().data;
  const [showNewProject, setShowNewProject] = reactExports.useState(false);
  const { mutate: deleteProject } = useDeleteProject();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, navigate]);
  if (!isAuthenticated) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AppAvatar,
          {
            name: profile == null ? void 0 : profile.name,
            src: (_a = profile == null ? void 0 : profile.avatar) == null ? void 0 : _a.getDirectURL(),
            size: "lg"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground leading-tight", children: [
            "Welcome back, ",
            (profile == null ? void 0 : profile.name) ?? "Artist"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            projects.length,
            " project",
            projects.length !== 1 ? "s" : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        AppButton,
        {
          variant: "default",
          onClick: () => setShowNewProject(true),
          "data-ocid": "dashboard.new_project.button",
          type: "button",
          className: "gradient-primary text-primary-foreground hover:opacity-90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            "New Project"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 mb-8", children: [
      {
        icon: FolderOpen,
        label: "Projects",
        value: projects.length,
        accent: "text-primary"
      },
      {
        icon: Share2,
        label: "Portfolio",
        value: "Public",
        accent: "text-chart-3"
      }
    ].map(({ icon: Icon, label, value, accent }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-secondary p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, className: accent }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
      ] })
    ] }) }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Recent Projects" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", "data-ocid": "dashboard.view_all.link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { variant: "ghost", size: "sm", type: "button", children: "View all" }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 rounded-2xl" }, i)) }) : projects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "dashboard.empty_state",
        className: "rounded-2xl border border-dashed border-border p-14 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FolderOpen,
            {
              size: 40,
              className: "text-muted-foreground mx-auto mb-3"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No projects yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Start by creating your first creative project" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AppButton,
            {
              variant: "default",
              className: "gradient-primary text-primary-foreground hover:opacity-90 mx-auto",
              onClick: () => setShowNewProject(true),
              "data-ocid": "dashboard.create_first_project.button",
              type: "button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
                " Create Project"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: projects.slice(0, 6).map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProjectCard,
      {
        project,
        index: i + 1,
        onDelete: (project2) => deleteProject(project2.id)
      },
      project.id.toString()
    )) }),
    projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl gradient-primary p-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-primary-foreground", children: "Share your portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-foreground/80 mt-0.5", children: "Let the world discover your creative work" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/portfolio/$principal",
          params: { principal: principalText },
          "data-ocid": "dashboard.portfolio_cta.link",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppButton, { variant: "secondary", type: "button", children: "View Portfolio" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewProjectModal, { open: showNewProject, onOpenChange: setShowNewProject })
  ] });
}
export {
  DashboardPage as default
};
