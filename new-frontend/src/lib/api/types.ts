/**
 * Common API Types and Interfaces
 */

// Generic API Response Wrapper
export interface ApiResponse<T> {
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

// API Error Response
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

// Pagination Parameters
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sort?: string;
}

// Filter Parameters
export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}




