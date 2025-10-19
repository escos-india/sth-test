"use server";

import { communityPosts } from '@/app/lib/data';

// This is a mock search function. In a real application, this would
// call a backend search service (e.g., Algolia, Elasticsearch, or a database query).
export async function searchContent(query: string) {
  if (!query) {
    return { posts: [], users: [], blogs: [] };
  }

  const lowerCaseQuery = query.toLowerCase();

  // Simulate filtering data based on the query
  const filteredPosts = communityPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
      post.author.name.toLowerCase().includes(lowerCaseQuery)
  ).slice(0, 3);

  // Simulate network delay to mimic a real API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { posts: filteredPosts, users: [], blogs: [] };
}
