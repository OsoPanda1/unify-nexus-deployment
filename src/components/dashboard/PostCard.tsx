import React from "react";
import { Post, FeedContext, getRenderablePostForViewer } from "../types/socialWall";

export default function PostCard({ post, ctx }: { post: Post; ctx: FeedContext }) {
  const viewerIsAuthor = post.authorId === ctx.viewerId;
  const viewerHasPaidUnlock = ctx.viewerPaidUnlocks.includes(post.id);
  const viewerIsSubscriber = ctx.viewerSubscriptions.includes(post.authorId);

  const visibility = getRenderablePostForViewer({
    post,
    viewerId: ctx.viewerId,
    viewerHasPaidUnlock,
    viewerIsSubscriber,
    viewerIsAuthor,
  });

  if (!visibility.canViewFull && visibility.showBlur) {
    return (
      <div className="post-card blurred">
        <p>Contenido bloqueado. {visibility.showPaywallBanner && "Desbloquea pagando."}</p>
      </div>
    );
  }

  return (
    <div className="post-card">
      <h3>{post.kind.toUpperCase()}</h3>
      {post.text && <p>{post.text}</p>}
      {post.mediaUrls && post.mediaUrls.map((url) => <img key={url} src={url} alt="media" />)}
      <p>Likes: {post.engagement.tachidosCount} | Superlikes: {post.engagement.tadehuevCount}</p>
    </div>
  );
}
