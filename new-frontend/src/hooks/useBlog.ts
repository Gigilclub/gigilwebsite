/**
 * Blog Hooks
 * React Query hooks for fetching blog data from Strapi
 */

'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  fetchBlogPosts,
  fetchBlogPostById,
  fetchBlogPostBySlug,
  fetchBlogCategories,
} from '@/lib/api/blog-api';
import type { BlogPostData, BlogPostQueryParams } from '@/types/blog';

// Query keys for React Query
export const blogKeys = {
  all: ['blog'] as const,
  posts: (params?: BlogPostQueryParams) => [...blogKeys.all, 'posts', params] as const,
  post: (id: number) => [...blogKeys.all, 'post', id] as const,
  postBySlug: (slug: string) => [...blogKeys.all, 'post', 'slug', slug] as const,
  categories: () => [...blogKeys.all, 'categories'] as const,
};

/**
 * Hook to fetch all blog posts
 */
export function useBlogPosts(params?: BlogPostQueryParams): UseQueryResult<BlogPostData[], Error> {
  return useQuery({
    queryKey: blogKeys.posts(params),
    queryFn: () => fetchBlogPosts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch a single blog post by ID
 */
export function useBlogPost(id: number): UseQueryResult<BlogPostData | null, Error> {
  return useQuery({
    queryKey: blogKeys.post(id),
    queryFn: () => fetchBlogPostById(id),
    enabled: !!id, // Only fetch if ID is provided
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single blog post by slug
 */
export function useBlogPostBySlug(slug: string): UseQueryResult<BlogPostData | null, Error> {
  return useQuery({
    queryKey: blogKeys.postBySlug(slug),
    queryFn: () => fetchBlogPostBySlug(slug),
    enabled: !!slug, // Only fetch if slug is provided
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch blog categories
 */
export function useBlogCategories() {
  return useQuery({
    queryKey: blogKeys.categories(),
    queryFn: fetchBlogCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes (categories don't change often)
  });
}




