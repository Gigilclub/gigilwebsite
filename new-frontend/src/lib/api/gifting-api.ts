/**
 * Gifting API Functions
 * Functions to interact with Express API for gifting features
 */

import { expressClient } from './express-client';
import type {
  ExpressApiResponse,
  Gift,
  GiftList,
  GiftItem,
  CreateGiftRequest,
  UpdateGiftRequest,
  CreateGiftListRequest,
  AddItemToListRequest,
  GiftQueryParams,
} from '@/types/gifting';

/**
 * Fetch all gifts
 */
export async function fetchGifts(params?: GiftQueryParams): Promise<Gift[]> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) {
      queryParams.append('page', String(params.page));
    }
    if (params?.limit) {
      queryParams.append('limit', String(params.limit));
    }
    if (params?.category) {
      queryParams.append('category', params.category);
    }
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    if (params?.sort) {
      queryParams.append('sort', params.sort);
    }

    const response = await expressClient.get<ExpressApiResponse<Gift[]>>(
      `/gifts?${queryParams.toString()}`
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || 'Failed to fetch gifts');
  } catch (error) {
    console.error('Error fetching gifts:', error);
    throw error;
  }
}

/**
 * Fetch a single gift by ID
 */
export async function fetchGiftById(id: string): Promise<Gift | null> {
  try {
    const response = await expressClient.get<ExpressApiResponse<Gift>>(
      `/gifts/${id}`
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching gift:', error);
    throw error;
  }
}

/**
 * Create a new gift
 */
export async function createGift(data: CreateGiftRequest): Promise<Gift> {
  try {
    const response = await expressClient.post<ExpressApiResponse<Gift>>(
      '/gifts',
      data
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || 'Failed to create gift');
  } catch (error) {
    console.error('Error creating gift:', error);
    throw error;
  }
}

/**
 * Update a gift
 */
export async function updateGift(
  id: string,
  data: UpdateGiftRequest
): Promise<Gift> {
  try {
    const response = await expressClient.put<ExpressApiResponse<Gift>>(
      `/gifts/${id}`,
      data
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || 'Failed to update gift');
  } catch (error) {
    console.error('Error updating gift:', error);
    throw error;
  }
}

/**
 * Delete a gift
 */
export async function deleteGift(id: string): Promise<void> {
  try {
    const response = await expressClient.delete<ExpressApiResponse<void>>(
      `/gifts/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to delete gift');
    }
  } catch (error) {
    console.error('Error deleting gift:', error);
    throw error;
  }
}

/**
 * Fetch all gift lists
 */
export async function fetchGiftLists(): Promise<GiftList[]> {
  try {
    const response = await expressClient.get<ExpressApiResponse<GiftList[]>>(
      '/gift-lists'
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || 'Failed to fetch gift lists');
  } catch (error) {
    console.error('Error fetching gift lists:', error);
    throw error;
  }
}

/**
 * Fetch a single gift list by ID
 */
export async function fetchGiftListById(id: string): Promise<GiftList | null> {
  try {
    const response = await expressClient.get<ExpressApiResponse<GiftList>>(
      `/gift-lists/${id}`
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching gift list:', error);
    throw error;
  }
}

/**
 * Create a new gift list
 */
export async function createGiftList(
  data: CreateGiftListRequest
): Promise<GiftList> {
  try {
    const response = await expressClient.post<ExpressApiResponse<GiftList>>(
      '/gift-lists',
      data
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || 'Failed to create gift list');
  } catch (error) {
    console.error('Error creating gift list:', error);
    throw error;
  }
}

/**
 * Add item to gift list
 */
export async function addItemToList(
  listId: string,
  data: AddItemToListRequest
): Promise<GiftItem> {
  try {
    const response = await expressClient.post<ExpressApiResponse<GiftItem>>(
      `/gift-lists/${listId}/items`,
      data
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || 'Failed to add item to list');
  } catch (error) {
    console.error('Error adding item to list:', error);
    throw error;
  }
}

/**
 * Remove item from gift list
 */
export async function removeItemFromList(
  listId: string,
  itemId: string
): Promise<void> {
  try {
    const response = await expressClient.delete<ExpressApiResponse<void>>(
      `/gift-lists/${listId}/items/${itemId}`
    );

    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to remove item from list');
    }
  } catch (error) {
    console.error('Error removing item from list:', error);
    throw error;
  }
}

/**
 * Health check endpoint
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await expressClient.get('/health');
    return response.status === 200;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}




