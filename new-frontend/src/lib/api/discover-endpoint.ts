/**
 * Helper function to discover the correct Strapi endpoint
 * This will try different endpoint names and return the one that works
 */

import { strapiClient } from './strapi-client';

const COMMON_ENDPOINTS = [
  'blog-posts',
  'posts',
  'articles',
  'blogs',
  'blog-post',
  'content',
  'entries',
  'blogposts',
  'blog_posts',
];

/**
 * Discover the correct blog posts endpoint
 */
export async function discoverBlogPostsEndpoint(): Promise<string | null> {
  for (const endpoint of COMMON_ENDPOINTS) {
    try {
      const response = await strapiClient.get(`/${endpoint}?pagination[pageSize]=1`);
      
      if (response.data && response.data.data !== null && response.data.data !== undefined) {
        console.log(`✅ Found working endpoint: /api/${endpoint}`);
        return endpoint;
      }
    } catch (error) {
      // Continue to next endpoint
      continue;
    }
  }
  
  return null;
}

/**
 * Test if an endpoint works
 */
export async function testEndpoint(endpoint: string): Promise<boolean> {
  try {
    const response = await strapiClient.get(`/${endpoint}?pagination[pageSize]=1`);
    return response.data && response.data.data !== null && response.data.data !== undefined;
  } catch {
    return false;
  }
}





