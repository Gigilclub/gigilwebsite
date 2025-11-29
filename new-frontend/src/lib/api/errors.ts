/**
 * API Error Handling Utilities
 */

import { AxiosError } from 'axios';
import { ApiError } from './types';

/**
 * Extract error message from various error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
};

/**
 * Extract API error from Axios error
 */
export const getApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const response = error.response;
    return {
      message: response?.data?.message || response?.data?.error?.message || error.message,
      status: response?.status,
      code: response?.data?.error?.code || error.code,
      details: response?.data,
    };
  }
  
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }
  
  return {
    message: 'An unknown error occurred',
  };
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return !error.response;
  }
  return false;
};

/**
 * Check if error is a 401 Unauthorized
 */
export const isUnauthorizedError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.response?.status === 401;
  }
  return false;
};

/**
 * Check if error is a 404 Not Found
 */
export const isNotFoundError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.response?.status === 404;
  }
  return false;
};




