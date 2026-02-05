import {
  Post,
  WalletState,
  EconomicParams,
  DEFAULT_ECONOMIC_PARAMS,
  Comment,
  CommentBadge,
  TamvProduct,
} from "../types/socialWall";

// Like gratuito (tachido)
export function giveTachido(post: Post): Post {
  return {
    ...post,
    engagement: {
      ...post.engagement,
      tachidosCount: post.engagement.tachidosCount + 1,
    },
  };
}

// Superlike de paga (tadehuev)
export function giveTadehuev(
  params: {
    post: Post;
    senderWallet: WalletState;
    creatorWallet: WalletState;
    platformWallet: WalletState;
  },
  economicParams: EconomicParams = DEFAULT_ECONOMIC_PARAMS
) {
  const { post, senderWallet, creatorWallet, platformWallet } = params;

  if (senderWallet.balanceTamv < economicParams.tadehuevPriceTamv) {
    throw new Error("Saldo TAMV-T insuficiente para tadehuev (superlike).");
  }

  const creatorAmount = economicParams.tadehuevPriceTamv * economicParams.creatorShare;
  const platformAmount = economicParams.tadehuevPriceTamv * economicParams.platformShare;

  const updatedSender: WalletState = {
    ...senderWallet,
    balanceTamv: senderWallet.balanceTamv - economicParams.tadehuevPriceTamv,
  };

  const updatedCreator: WalletState = {
    ...creatorWallet,
    balanceTamv: creatorWallet.balanceTamv + creatorAmount,
  };

  const updatedPlatform: WalletState = {
    ...platformWallet,
    balanceTamv: platformWallet.balanceTamv + platformAmount,
  };

  const updatedPost: Post = {
    ...post,
    engagement: {
      ...post.engagement,
      tadehuevCount: post.engagement.tadehuevCount + 1,
      revenueCreatorTamv: post.engagement.revenueCreatorTamv + creatorAmount,
      revenuePlatformTamv: post.engagement.revenuePlatformTamv + platformAmount,
    },
  };

  return {
    post: updatedPost,
    senderWallet: updatedSender,
    creatorWallet: updatedCreator,
    platformWallet: updatedPlatform,
  };
}

// Aplicar insignia a comentario
export function applyBadgeToComment(params: {
  comment: Comment;
  badge: CommentBadge;
  platformWallet: WalletState;
  usdToTamvRate: number;
  badgesRevenueUsdTotal: number;
}) {
  const { comment, badge, platformWallet, usdToTamvRate, badgesRevenueUsdTotal } = params;

  const platformTamvAmount = badge.priceUsd * usdToTamvRate;

  const updatedPlatformWallet: WalletState = {
    ...platformWallet,
    balanceTamv: platformWallet.balanceTamv + platformTamvAmount,
  };

  const updatedComment: Comment = {
    ...comment,
    badgeId: badge.id,
    badgeAppliedAt: new Date().toISOString(),
  };

  return {
    comment: updatedComment,
    platformWallet: updatedPlatformWallet,
    badgesRevenueUsdTotal: badgesRevenueUsdTotal + badge.priceUsd,
  };
}

// Stake de gobernanza por autor
export function stakeTgnOnPostByAuthor(params: {
  post: Post;
  authorWalletTgn: number;
  amountTgn: number;
}) {
  const { post, authorWalletTgn, amountTgn } = params;

  if (authorWalletTgn < amountTgn) {
    throw new Error("TGN insuficiente para stake");
  }

  const updatedPost: Post = {
    ...post,
    governance: {
      ...(post.governance ?? {
        governanceWeightTgn: 0,
        stakedTgnByAuthor: 0,
        stakedTgnByCommunity: 0,
        curationStatus: "PENDING",
      }),
      stakedTgnByAuthor: (post.governance?.stakedTgnByAuthor ?? 0) + amountTgn,
      governanceWeightTgn: (post.governance?.governanceWeightTgn ?? 0) + amountTgn * 2,
    },
  };

  return {
    post: updatedPost,
    authorWalletTgn: authorWalletTgn - amountTgn,
  };
}

// Stake de gobernanza por comunidad
export function stakeTgnOnPostByCommunity(params: {
  post: Post;
  userWalletTgn: number;
  amountTgn: number;
  direction: "UPVOTE" | "DOWNVOTE";
}) {
  const { post, userWalletTgn, amountTgn, direction } = params;

  if (userWalletTgn < amountTgn) {
    throw new Error("TGN insuficiente para stake comunitario");
  }

  const sign = direction === "UPVOTE" ? 1 : -1;
  const updatedWeight = (post.governance?.governanceWeightTgn ?? 0) + sign * amountTgn;

  const updatedPost: Post = {
    ...post,
    governance: {
      ...(post.governance ?? {
        governanceWeightTgn: 0,
        stakedTgnByAuthor: 0,
        stakedTgnByCommunity: 0,
        curationStatus: "PENDING",
      }),
      stakedTgnByCommunity: (post.governance?.stakedTgnByCommunity ?? 0) + amountTgn,
      governanceWeightTgn: updatedWeight,
    },
  };

  return {
    post: updatedPost,
    userWalletTgn: userWalletTgn - amountTgn,
  };
}

// Compra de productos TAMV (curso o concierto)
export function buyTamvProduct(
  params: {
    product: TamvProduct;
    buyerWalletTamv: number;
    creatorWalletTamv: number;
    platformWalletTamv: number;
  },
  economicParams: EconomicParams = DEFAULT_ECONOMIC_PARAMS
) {
  const { product, buyerWalletTamv, creatorWalletTamv, platformWalletTamv } = params;

  if (buyerWalletTamv < product.priceTamv) {
    throw new Error("TAMV-T insuficiente para comprar este producto.");
  }

  const creatorAmount = product.priceTamv * economicParams.creatorShare;
  const platformAmount = product.priceTamv * economicParams.platformShare;

  const updatedBuyerWallet = buyerWalletTamv - product.priceTamv;
  const updatedCreatorWallet = creatorWalletTamv + creatorAmount;
  const updatedPlatformWallet = platformWalletTamv + platformAmount;

  const updatedProduct: TamvProduct = {
    ...product,
    soldUnits: product.soldUnits + 1,
    revenueCreatorTamv: product.revenueCreatorTamv + creatorAmount,
    revenuePlatformTamv: product.revenuePlatformTamv + platformAmount,
  };

  return {
    product: updatedProduct,
    buyerWalletTamv: updatedBuyerWallet,
    creatorWalletTamv: updatedCreatorWallet,
    platformWalletTamv: updatedPlatformWallet,
  };
}
