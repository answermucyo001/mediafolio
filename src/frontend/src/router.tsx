import { Layout } from "@/components/layout/Layout";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

// Public routes (no sidebar)
const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio/$principal",
  component: PortfolioPage,
});

// App layout wrapper (sidebar)
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Layout />
    </Suspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const projectsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/projects",
  component: ProjectsPage,
});

const projectDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/projects/$id",
  component: ProjectDetailPage,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  portfolioRoute,
  appLayoutRoute.addChildren([
    dashboardRoute,
    projectsRoute,
    projectDetailRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
