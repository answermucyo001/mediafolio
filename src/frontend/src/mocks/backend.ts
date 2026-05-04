import type { backendInterface, MediaItemView, ProjectView, UserProfile, PortfolioView } from "../backend";
import { MediaType, UserRole, ExternalBlob } from "../backend";

const sampleBlob = ExternalBlob.fromURL("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400");

const sampleProjects: ProjectView[] = [
  {
    id: BigInt(1),
    title: "Desert Landscapes",
    owner: "alice",
    createdAt: BigInt(1672531200000),
    description: "A series of stunning desert photography",
    updatedAt: BigInt(1672531200000),
  },
  {
    id: BigInt(2),
    title: "Urban Portraits",
    owner: "alice",
    createdAt: BigInt(1675209600000),
    description: "Street portraits from city life",
    updatedAt: BigInt(1675209600000),
  },
  {
    id: BigInt(3),
    title: "Audio Sessions",
    owner: "alice",
    createdAt: BigInt(1677628800000),
    description: "Studio recording sessions",
    updatedAt: BigInt(1677628800000),
  },
  {
    id: BigInt(4),
    title: "Forest Videos",
    owner: "alice",
    createdAt: BigInt(1680307200000),
    description: "Short films in the forest",
    updatedAt: BigInt(1680307200000),
  },
];

const sampleMedia: MediaItemView[] = [
  {
    id: BigInt(1),
    blob: sampleBlob,
    name: "desert-sunrise.jpg",
    projectId: BigInt(1),
    caption: "Golden hour over the dunes",
    mediaType: MediaType.photo,
    uploadedAt: BigInt(1672531200000),
  },
  {
    id: BigInt(2),
    blob: ExternalBlob.fromURL("https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=400"),
    name: "city-walk.mp4",
    projectId: BigInt(2),
    caption: "Evening walk through downtown",
    mediaType: MediaType.video,
    uploadedAt: BigInt(1675209600000),
  },
  {
    id: BigInt(3),
    blob: ExternalBlob.fromURL("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"),
    name: "session-01.mp3",
    projectId: BigInt(3),
    caption: "Live studio session",
    mediaType: MediaType.audio,
    uploadedAt: BigInt(1677628800000),
  },
];

const sampleProfile: UserProfile = {
  name: "Alex Laurent",
  avatar: ExternalBlob.fromURL("https://i.pravatar.cc/100?img=12"),
};

export const mockBackend: backendInterface = {
  addMedia: async (_projectId, name, mediaType, blob, caption) => ({
    id: BigInt(Date.now()),
    blob,
    name,
    projectId: BigInt(1),
    caption,
    mediaType,
    uploadedAt: BigInt(Date.now()),
  }),
  assignCallerUserRole: async () => undefined,
  createProject: async (title, description) => ({
    id: BigInt(Date.now()),
    title,
    owner: "alice",
    createdAt: BigInt(Date.now()),
    description,
    updatedAt: BigInt(Date.now()),
  }),
  deleteMedia: async () => true,
  deleteProject: async () => true,
  getCallerUserProfile: async () => sampleProfile,
  getCallerUserRole: async () => UserRole.user,
  getPortfolio: async () => ({
    media: sampleMedia,
    projects: sampleProjects,
    owner: "alice",
    profile: sampleProfile,
  } as PortfolioView),
  getProject: async () => sampleProjects[0],
  isCallerAdmin: async () => false,
  listMyProjects: async () => sampleProjects,
  listProjectMedia: async () => sampleMedia,
  saveCallerUserProfile: async () => undefined,
  updateProject: async () => true,
  _immutableObjectStorageBlobsAreLive: async () => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => undefined,
  _immutableObjectStorageCreateCertificate: async () => ({ method: "", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async () => ({}),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,
};
