import { useEffect, useState } from "react";
import { Post, FeedContext, buildGlobalWallFeed } from "../types/socialWall";
import { supabase } from "../lib/supabaseClient";

export function usePosts(ctx: FeedContext) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("posts").select("*");
      if (data) {
        const feed = buildGlobalWallFeed(data as Post[], ctx);
        setPosts(feed);
      }
    };
    fetchPosts();

    const subscription = supabase
      .channel("posts-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, fetchPosts)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [ctx]);

  return posts;
}
