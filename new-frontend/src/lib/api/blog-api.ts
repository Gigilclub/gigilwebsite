/**
 * Blog API Functions
 * Functions to interact with Strapi CMS for blog content
 */

import axios from 'axios';
import { strapiClient, getStrapiImageUrl } from './strapi-client';
import { discoverBlogPostsEndpoint } from './discover-endpoint';
import type {
  BlogPost,
  BlogPostQueryParams,
  StrapiResponse,
  BlogPostData,
} from '@/types/blog';
import { format } from 'date-fns';

let resolvedBlogEndpoint =
  process.env.NEXT_PUBLIC_STRAPI_BLOG_ENDPOINT || null;

const getBlogEndpoint = async (): Promise<string> => {
  if (resolvedBlogEndpoint) {
    return resolvedBlogEndpoint;
  }

  const discovered = await discoverBlogPostsEndpoint();
  if (discovered) {
    resolvedBlogEndpoint = discovered;
    return discovered;
  }

  resolvedBlogEndpoint = 'blog-posts';
  return resolvedBlogEndpoint;
};

/**
 * Transform Strapi blog post to frontend format
 */
function extractAttributes(post: any): Record<string, any> {
  if (post && post.attributes) {
    return post.attributes;
  }
  return post || {};
}

function extractTextFromRichContent(content: any): string {
  if (!Array.isArray(content)) {
    return '';
  }

  return content
    .map((block) => {
      if (block.type === 'paragraph' && Array.isArray(block.children)) {
        return block.children
          .map((child) => child.text || '')
          .join('');
      }
      return '';
    })
    .join('\n')
    .trim();
}

export function transformBlogPost(post: BlogPost): BlogPostData {
  const attrs = extractAttributes(post);

  const coverImageUrl =
    attrs.coverImage?.data?.attributes?.url || attrs.coverImage?.url;
  const imageUrl = coverImageUrl ? getStrapiImageUrl(coverImageUrl) : '/images/blog/placeholder.jpg';

  const category =
    attrs.category?.data?.attributes?.name ||
    attrs.slug ||
    'Uncategorized';

  const authorName =
    attrs.author?.data?.attributes?.name ||
    attrs.author?.name ||
    attrs.createdBy?.firstname ||
    'Anonymous';

  const authorAvatarUrl =
    attrs.author?.data?.attributes?.avatar?.data?.attributes?.url ||
    attrs.author?.avatar?.data?.attributes?.url ||
    attrs.author?.avatar?.url ||
    attrs.createdBy?.avatar?.data?.attributes?.url;

  const authorAvatar = authorAvatarUrl
    ? getStrapiImageUrl(authorAvatarUrl)
    : '/images/blog/avatar-placeholder.jpg';

  const date = attrs.publishedAt || attrs.createdAt || new Date().toISOString();
  const formattedDate = format(new Date(date), 'MMM d, yyyy');

  const contentText = typeof attrs.content === 'string'
    ? attrs.content
    : extractTextFromRichContent(attrs.content);

  const excerpt = attrs.excerpt || contentText.slice(0, 180) || '';

  return {
    id: post.id,
    title: attrs.title || 'Untitled Post',
    slug: attrs.slug || `post-${post.id}`,
    excerpt,
    content: contentText,
    image: imageUrl,
    category,
    author: {
      name: authorName,
      avatar: authorAvatar,
    },
    date: formattedDate,
    publishedAt: attrs.publishedAt || attrs.createdAt || null,
  };
}

/**
 * Fetch all blog posts from Strapi
 */
export async function fetchBlogPosts(
  params?: BlogPostQueryParams
): Promise<BlogPostData[]> {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();

    const endpoint = await getBlogEndpoint();
  // Populate related data
  if (params?.populate) {
    if (Array.isArray(params.populate)) {
      params.populate.forEach((relation) => {
        queryParams.append(`populate[${relation}]`, '*');
      });
    } else {
      queryParams.append(`populate[${params.populate}]`, '*');
    }
  } else {
    // Default: populate everything
    queryParams.append('populate', '*');
  }

    // Sort by published date (newest first)
    queryParams.append('sort', params?.sort || 'publishedAt:desc');

    // Add pagination
    if (params?.pagination) {
      queryParams.append('pagination[page]', String(params.pagination.page || 1));
      queryParams.append('pagination[pageSize]', String(params.pagination.pageSize || 10));
    }

    // Add filters if provided
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        queryParams.append(`filters[${key}]`, String(value));
      });
    }

    // Make API call
    const response = await strapiClient.get<StrapiResponse<BlogPost[]>>(
      `/${endpoint}?${queryParams.toString()}`
    );

    // Transform and return data
    if (Array.isArray(response.data.data)) {
      return response.data.data.map(transformBlogPost);
    }

    return [];
  } catch (error) {
    if (axios.isCancel(error) || (error as any)?.code === 'ERR_CANCELED') {
      return [];
    }
    console.error('Error fetching blog posts:', {
      message: (error as any)?.message,
      response: (error as any)?.response?.data,
      status: (error as any)?.response?.status,
    });
    throw error;
  }
}

/**
 * Fetch a single blog post by ID
 */
export async function fetchBlogPostById(id: number): Promise<BlogPostData | null> {
  try {
    const endpoint = await getBlogEndpoint();
    const response = await strapiClient.get<StrapiResponse<BlogPost>>(
      `/${endpoint}/${id}?populate=*`
    );

    if (response.data.data) {
      return transformBlogPost(response.data.data);
    }

    return null;
  } catch (error) {
    if (axios.isCancel(error) || (error as any)?.code === 'ERR_CANCELED') {
      return null;
    }
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPostData | null> {
  try {
    const endpoint = await getBlogEndpoint();
    const response = await strapiClient.get<StrapiResponse<BlogPost[]>>(
      `/${endpoint}?filters[slug][$eq]=${slug}&populate=*`
    );

    if (response.data.data && response.data.data.length > 0) {
      return transformBlogPost(response.data.data[0]);
    }

    return null;
  } catch (error) {
    if (axios.isCancel(error) || (error as any)?.code === 'ERR_CANCELED') {
      return null;
    }
    console.error('Error fetching blog post by slug:', error);
    throw error;
  }
}

/**
 * Fetch blog categories
 */
export async function fetchBlogCategories() {
  try {
    const response = await strapiClient.get<StrapiResponse<any[]>>('/categories');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}




