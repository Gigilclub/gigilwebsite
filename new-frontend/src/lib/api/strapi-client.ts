/**
 * Strapi CMS API Client
 * Connects to backend/strapi service for blog content
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { getApiError, isUnauthorizedError } from './errors';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

// Create axios instance for Strapi API
export const strapiClient: AxiosInstance = axios.create({
  baseURL: STRAPI_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token if available
strapiClient.interceptors.request.use(
  (config) => {
    // Strapi might require API token for some endpoints
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('strapi_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle Strapi's response format
strapiClient.interceptors.response.use(
  (response) => {
    // Strapi wraps data in a 'data' property
    // We'll handle this in our hooks, but we can also transform here if needed
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized
    if (isUnauthorizedError(error)) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('strapi_token');
      }
    }
    return Promise.reject(getApiError(error));
  }
);

/**
 * Helper function to get full image URL from Strapi
 * Strapi returns relative URLs, we need to prepend the base URL
 */
export const getStrapiImageUrl = (url: string | null | undefined): string => {
  if (!url) return '/placeholder-image.jpg';
  
  // If URL is already absolute, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Get base URL (without /api)
  const baseUrl = STRAPI_API_URL.replace('/api', '');
  
  // Return full URL
  return `${baseUrl}${url}`;
};

export default strapiClient;




