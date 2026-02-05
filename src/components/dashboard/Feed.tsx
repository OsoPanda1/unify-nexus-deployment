import React from "react";
import { usePosts } from "../hooks/usePosts";
import { FeedContext, Post } from "../types/socialWall";
import PostCard from "./PostCard";

export default function Feed({ ctx }: { ctx: FeedContext }) {
  const posts = usePosts(ctx);

  return (
    <div className="feed">
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} ctx={ctx} />
      ))}
    </div>
  );
}
