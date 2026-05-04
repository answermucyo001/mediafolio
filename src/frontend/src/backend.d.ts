import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type MediaId = bigint;
export interface PortfolioView {
    media: Array<MediaItemView>;
    projects: Array<ProjectView>;
    owner: string;
    profile?: UserProfile;
}
export interface MediaItemView {
    id: MediaId;
    blob: ExternalBlob;
    name: string;
    projectId: ProjectId;
    caption: string;
    mediaType: MediaType;
    uploadedAt: bigint;
}
export interface ProjectView {
    id: ProjectId;
    title: string;
    owner: string;
    createdAt: bigint;
    description: string;
    updatedAt: bigint;
}
export type ProjectId = bigint;
export interface UserProfile {
    name: string;
    avatar?: ExternalBlob;
}
export enum MediaType {
    audio = "audio",
    video = "video",
    photo = "photo"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMedia(projectId: ProjectId, name: string, mediaType: MediaType, blob: ExternalBlob, caption: string): Promise<MediaItemView>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createProject(title: string, description: string): Promise<ProjectView>;
    deleteMedia(mediaId: MediaId): Promise<boolean>;
    deleteProject(id: ProjectId): Promise<boolean>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPortfolio(owner: Principal): Promise<PortfolioView>;
    getProject(id: ProjectId): Promise<ProjectView | null>;
    isCallerAdmin(): Promise<boolean>;
    listMyProjects(): Promise<Array<ProjectView>>;
    listProjectMedia(projectId: ProjectId): Promise<Array<MediaItemView>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProject(id: ProjectId, title: string, description: string): Promise<boolean>;
}
