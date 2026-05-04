import type { ProjectView } from "@/backend";
import { AppButton } from "@/components/common/AppButton";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteProject, useProjects } from "@/hooks/useProjects";
import { FolderOpen, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProjectsPage() {
  const { isAuthenticated, login, isLoggingIn } = useAuth();
  const { data: projects = [], isLoading } = useProjects();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const [showNewProject, setShowNewProject] = useState(false);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-5 py-20">
        <FolderOpen size={44} className="text-muted-foreground" />
        <div className="text-center">
          <p className="text-lg font-display font-semibold text-foreground">
            Sign in to view your projects
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Your creative portfolio awaits
          </p>
        </div>
        <AppButton
          variant="default"
          className="gradient-primary text-primary-foreground hover:opacity-90"
          onClick={login}
          disabled={isLoggingIn}
          data-ocid="projects.login.button"
          type="button"
        >
          Sign In
        </AppButton>
      </div>
    );
  }

  const handleDelete = (project: ProjectView) => {
    if (!confirm(`Delete project "${project.title}"? This cannot be undone.`))
      return;
    setDeletingId(project.id);
    deleteProject(project.id, {
      onSuccess: () => {
        toast.success("Project deleted");
        setDeletingId(null);
      },
      onError: () => {
        toast.error("Failed to delete project");
        setDeletingId(null);
      },
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Projects
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoading
              ? "Loading..."
              : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <AppButton
          variant="default"
          className="gradient-primary text-primary-foreground hover:opacity-90"
          onClick={() => setShowNewProject(true)}
          data-ocid="projects.new_project.button"
          type="button"
        >
          <Plus size={16} /> New Project
        </AppButton>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div
          data-ocid="projects.empty_state"
          className="rounded-2xl border border-dashed border-border p-16 text-center"
        >
          <FolderOpen
            size={44}
            className="text-muted-foreground mx-auto mb-4"
          />
          <p className="font-display font-bold text-xl text-foreground mb-2">
            No projects yet
          </p>
          <p className="text-muted-foreground mb-6">
            Create a project to organize your photos, videos, and audio
          </p>
          <AppButton
            variant="default"
            size="lg"
            className="gradient-primary text-primary-foreground hover:opacity-90"
            onClick={() => setShowNewProject(true)}
            data-ocid="projects.create_first.button"
            type="button"
          >
            <Plus size={18} /> Create your first project
          </AppButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id.toString()}
              project={project}
              index={i + 1}
              onDelete={handleDelete}
              isDeleting={isDeleting && deletingId === project.id}
            />
          ))}
        </div>
      )}

      <NewProjectModal open={showNewProject} onOpenChange={setShowNewProject} />
    </div>
  );
}
