/**
 * Gifting API Types
 * Types for Express API (Gifting features)
 */

// Generic API Response
export interface ExpressApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Gift item
export interface Gift {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

// User
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Gift list/item
export interface GiftItem {
  id: string;
  giftId: string;
  gift?: Gift;
  quantity: number;
  notes?: string;
  purchased: boolean;
  createdAt: string;
  updatedAt: string;
}

// Gift list
export interface GiftList {
  id: string;
  name: string;
  description?: string;
  userId: string;
  user?: User;
  items: GiftItem[];
  createdAt: string;
  updatedAt: string;
}

// Create gift request
export interface CreateGiftRequest {
  name: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
}

// Update gift request
export interface UpdateGiftRequest {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
}

// Create gift list request
export interface CreateGiftListRequest {
  name: string;
  description?: string;
}

// Add item to list request
export interface AddItemToListRequest {
  giftId: string;
  quantity?: number;
  notes?: string;
}

// Query parameters
export interface GiftQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: string;
}




