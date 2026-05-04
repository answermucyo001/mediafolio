import { AppModal } from "@/components/common/AppModal";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/hooks/useProjects";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProjectModal({ open, onOpenChange }: NewProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { mutateAsync, isPending } = useCreateProject();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const project = await mutateAsync({
        title: title.trim(),
        description: description.trim(),
      });
      toast.success("Project created");
      onOpenChange(false);
      setTitle("");
      setDescription("");
      navigate({ to: "/projects/$id", params: { id: project.id.toString() } });
    } catch {
      toast.error("Failed to create project");
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="New Project"
      description="Create a project to organize your media"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="project-title"
            className="text-sm font-display font-medium text-foreground"
          >
            Title
          </label>
          <input
            id="project-title"
            data-ocid="new_project.title.input"
            className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="e.g. Summer Portraits 2025"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={120}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="project-description"
            className="text-sm font-display font-medium text-foreground"
          >
            Description
            <span className="text-muted-foreground font-normal ml-1">
              (optional)
            </span>
          </label>
          <textarea
            id="project-description"
            data-ocid="new_project.description.textarea"
            className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder="What's this project about?"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          />
        </div>
        <div className="flex gap-3 justify-end pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-ocid="new_project.cancel.button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            className="gradient-primary text-primary-foreground hover:opacity-90"
            disabled={isPending || !title.trim()}
            data-ocid="new_project.submit.button"
          >
            {isPending ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </AppModal>
  );
}
