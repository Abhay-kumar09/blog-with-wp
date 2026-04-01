"use server";

import { getPostList } from "./posts";

export async function loadMorePosts(cursor) {
  const posts = await getPostList(cursor);
  return posts;
}
