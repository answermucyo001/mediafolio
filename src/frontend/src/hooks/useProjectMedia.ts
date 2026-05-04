import { ExternalBlob, type MediaType, createActor } from "@/backend";
import type { MediaItemView } from "@/backend";
import { mediaTypeFromFile } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProjectMedia(projectId: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<MediaItemView[]>({
    queryKey: ["projectMedia", projectId?.toString()],
    queryFn: async () => {
      if (!actor || projectId === undefined) return [];
      const result = await actor.listProjectMedia(projectId);
      return result ?? [];
    },
    enabled: !!actor && !actorFetching && projectId !== undefined,
  });
}

export function useAddMedia() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      file,
      caption,
      onProgress,
    }: {
      projectId: bigint;
      file: File;
      caption: string;
      onProgress?: (pct: number) => void;
    }): Promise<MediaItemView> => {
      if (!actor) throw new Error("Not connected");

      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) blob.withUploadProgress(onProgress);

      const mediaType: MediaType = mediaTypeFromFile(file.name);

      return actor.addMedia(projectId, file.name, mediaType, blob, caption);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projectMedia", variables.projectId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteMedia() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      mediaId,
      projectId: _projectId,
    }: {
      mediaId: bigint;
      projectId: bigint;
    }): Promise<boolean> => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteMedia(mediaId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projectMedia", variables.projectId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
