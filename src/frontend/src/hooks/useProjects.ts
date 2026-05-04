import { createActor } from "@/backend";
import type { ProjectView, UserProfile } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  const query = useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveUserProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useProjects() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<ProjectView[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.listMyProjects();
      return result ?? [];
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useProject(id: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<ProjectView | null>({
    queryKey: ["project", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getProject(id);
    },
    enabled: !!actor && !actorFetching && id !== undefined,
  });
}

export function useCreateProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }): Promise<ProjectView> => {
      if (!actor) throw new Error("Not connected");
      return actor.createProject(title, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint): Promise<boolean> => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function usePortfolio(ownerPrincipal: string | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["portfolio", ownerPrincipal],
    queryFn: async () => {
      if (!actor || !ownerPrincipal) return null;
      // getPortfolio accepts Principal — pass as string (backend coerces)
      // @ts-expect-error - principal string compatible at runtime
      return actor.getPortfolio(ownerPrincipal);
    },
    enabled: !!actor && !actorFetching && !!ownerPrincipal,
  });
}
