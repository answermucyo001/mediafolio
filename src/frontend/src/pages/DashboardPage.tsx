import { AppAvatar } from "@/components/common/AppAvatar";
import { AppButton } from "@/components/common/AppButton";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  useDeleteProject,
  useProjects,
  useUserProfile,
} from "@/hooks/useProjects";
import { Link, useNavigate } from "@tanstack/react-router";
import { FolderOpen, Plus, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { isAuthenticated, isInitializing, principalText } = useAuth();
  const { data: projects = [], isLoading } = useProjects();
  const profile = useUserProfile().data;
  const [showNewProject, setShowNewProject] = useState(false);
  const { mutate: deleteProject } = useDeleteProject();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <AppAvatar
            name={profile?.name}
            src={profile?.avatar?.getDirectURL()}
            size="lg"
          />
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground leading-tight">
              Welcome back, {profile?.name ?? "Artist"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <AppButton
          variant="default"
          onClick={() => setShowNewProject(true)}
          data-ocid="dashboard.new_project.button"
          type="button"
          className="gradient-primary text-primary-foreground hover:opacity-90"
        >
          <Plus size={16} />
          New Project
        </AppButton>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          {
            icon: FolderOpen,
            label: "Projects",
            value: projects.length,
            accent: "text-primary",
          },
          {
            icon: Share2,
            label: "Portfolio",
            value: "Public",
            accent: "text-chart-3",
          },
        ].map(({ icon: Icon, label, value, accent }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 py-4">
              <div className="rounded-xl bg-secondary p-3">
                <Icon size={18} className={accent} />
              </div>
              <div>
                <p className="font-display font-bold text-xl text-foreground">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent projects */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-lg text-foreground">
          Recent Projects
        </h2>
        <Link to="/projects" data-ocid="dashboard.view_all.link">
          <AppButton variant="ghost" size="sm" type="button">
            View all
          </AppButton>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-56 rounded-2xl" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div
          data-ocid="dashboard.empty_state"
          className="rounded-2xl border border-dashed border-border p-14 text-center"
        >
          <FolderOpen
            size={40}
            className="text-muted-foreground mx-auto mb-3"
          />
          <p className="font-display font-semibold text-foreground mb-1">
            No projects yet
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            Start by creating your first creative project
          </p>
          <AppButton
            variant="default"
            className="gradient-primary text-primary-foreground hover:opacity-90 mx-auto"
            onClick={() => setShowNewProject(true)}
            data-ocid="dashboard.create_first_project.button"
            type="button"
          >
            <Plus size={16} /> Create Project
          </AppButton>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projects.slice(0, 6).map((project, i) => (
            <ProjectCard
              key={project.id.toString()}
              project={project}
              index={i + 1}
              onDelete={(project) => deleteProject(project.id)}
            />
          ))}
        </div>
      )}

      {/* Portfolio CTA */}
      {projects.length > 0 && (
        <div className="mt-8 rounded-2xl gradient-primary p-6 flex items-center justify-between">
          <div>
            <p className="font-display font-bold text-lg text-primary-foreground">
              Share your portfolio
            </p>
            <p className="text-sm text-primary-foreground/80 mt-0.5">
              Let the world discover your creative work
            </p>
          </div>
          <Link
            to="/portfolio/$principal"
            params={{ principal: principalText }}
            data-ocid="dashboard.portfolio_cta.link"
          >
            <AppButton variant="secondary" type="button">
              View Portfolio
            </AppButton>
          </Link>
        </div>
      )}

      <NewProjectModal open={showNewProject} onOpenChange={setShowNewProject} />
    </div>
  );
}
