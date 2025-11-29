/**
 * Express API Client for Gifting API
 * Connects to backend/express service
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { getApiError, isUnauthorizedError } from './errors';

const EXPRESS_API_URL = process.env.NEXT_PUBLIC_EXPRESS_API_URL || 'http://localhost:3001/api';

// Create axios instance for Express API
export const expressClient: AxiosInstance = axios.create({
  baseURL: EXPRESS_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token if available
expressClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
expressClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized
    if (isUnauthorizedError(error)) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // Optionally redirect to login
        // window.location.href = '/login';
      }
    }
    return Promise.reject(getApiError(error));
  }
);

export default expressClient;

