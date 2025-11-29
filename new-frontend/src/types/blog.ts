/**
 * Blog Types for Strapi CMS
 * These types match Strapi's response structure
 */

// Strapi's standard response wrapper
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Strapi's standard data structure with id and attributes
export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

// Blog Post attributes from Strapi
export interface BlogPostAttributes {
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    data: StrapiEntity<CategoryAttributes> | null;
  };
  author?: {
    data: StrapiEntity<AuthorAttributes> | null;
  };
  image?: {
    data: StrapiEntity<ImageAttributes> | null;
  };
}

// Category attributes
export interface CategoryAttributes {
  name: string;
  slug: string;
  description?: string;
}

// Author attributes
export interface AuthorAttributes {
  name: string;
  email?: string;
  avatar?: {
    data: StrapiEntity<ImageAttributes> | null;
  };
}

// Image attributes from Strapi
export interface ImageAttributes {
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: unknown;
  createdAt: string;
  updatedAt: string;
}

// Image format sizes
export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: string | null;
  url: string;
}

// Full blog post type (Strapi entity)
export type BlogPost = StrapiEntity<BlogPostAttributes>;

// Full category type
export type Category = StrapiEntity<CategoryAttributes>;

// Full author type
export type Author = StrapiEntity<AuthorAttributes>;

// Transformed blog post for frontend use
export interface BlogPostData {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  publishedAt: string;
}

// Query parameters for fetching blog posts
export interface BlogPostQueryParams {
  populate?: string | string[];
  sort?: string | string[];
  filters?: Record<string, unknown>;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}




