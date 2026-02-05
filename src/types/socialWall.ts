/**
 * TAMV Social Wall - Muro Global con Economía Dual (TAMV-T + TGN)
 * Integra superlikes pagados, insignias, DreamSpaces y gobernanza comunitaria
 */

export type ContentKind =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "dreamspace"
  | "course"
  | "contribution"
  | "sensory_concert"
  | "art"
  | "culture"
  | "reel"
  | "stream"
  | "story"
  | "call";

export type VisibilityMode =
  | "PUBLIC_FREE"
  | "LOCKED_PREVIEW"
  | "SUBSCRIBERS_ONLY"
  | "OWNER_ONLY";

export interface PostMonetizationConfig {
  visibilityMode: VisibilityMode;
  unlockPriceTamv?: number;
  subscriptionPriceMonthlyTamv?: number;
  accessDurationDays?: number;
}

export interface PostEngagementStats {
  tachidosCount: number;
  tadehuevCount: number;
  commentsCount: number;
  sharesCount: number;
  revenueCreatorTamv: number;
  revenuePlatformTamv: number;
  badgesUsedCount: number;
  badgesRevenueUsd: number;
}

export interface PostGovernanceMeta {
  governanceWeightTgn: number;
  stakedTgnByAuthor: number;
  stakedTgnByCommunity: number;
  curationStatus: "PENDING" | "APPROVED" | "FLAGGED" | "SANCTIONED";
}

export interface XRExperienceRef {
  id: string;
  type: "dreamspace" | "sensory_concert";
  sceneId: string;
  audioSceneId?: string;
  emotionPreset?: "calm" | "euphoric" | "melancholic" | "tribal" | "ancestral";
}

export interface Post {
  id: string;
  authorId: string;
  kind: ContentKind;
  text?: string;
  mediaUrls?: string[];
  dreamspaceRefId?: string;
  xrRef?: XRExperienceRef;
  createdAt: string;
  updatedAt?: string;
  monetization: PostMonetizationConfig;
  engagement: PostEngagementStats;
  governance?: PostGovernanceMeta;
  isCensoredForPublic: boolean;
  ethicalScore: number;
  riskScore: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  createdAt: string;
  tachidosCount: number;
  tadehuevCount: number;
  badgeId?: string;
  badgeAppliedAt?: string;
  priorityScore: number;
}

export interface WalletState {
  userId: string;
  balanceTamv: number;
  balanceTgn: number;
  stakedTgn: number;
}

export interface EconomicParams {
  tadehuevPriceTamv: number;
  creatorShare: number;
  platformShare: number;
  badgePriceUsd: number;
  courseBaseRoyaltyShare: number;
  sensoryConcertRoyaltyShare: number;
  lastUpdatedByProposalId: string;
}

export const DEFAULT_ECONOMIC_PARAMS: EconomicParams = {
  tadehuevPriceTamv: 5,
  creatorShare: 0.75,
  platformShare: 0.25,
  badgePriceUsd: 5,
  courseBaseRoyaltyShare: 0.75,
  sensoryConcertRoyaltyShare: 0.75,
  lastUpdatedByProposalId: "genesis",
};
