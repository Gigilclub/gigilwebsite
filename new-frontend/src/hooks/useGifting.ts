/**
 * Gifting Hooks
 * React Query hooks for gifting API
 */

'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import {
  fetchGifts,
  fetchGiftById,
  createGift,
  updateGift,
  deleteGift,
  fetchGiftLists,
  fetchGiftListById,
  createGiftList,
  addItemToList,
  removeItemFromList,
  checkHealth,
} from '@/lib/api/gifting-api';
import type {
  Gift,
  GiftList,
  GiftItem,
  CreateGiftRequest,
  UpdateGiftRequest,
  CreateGiftListRequest,
  AddItemToListRequest,
  GiftQueryParams,
} from '@/types/gifting';

// Query keys
export const giftingKeys = {
  all: ['gifting'] as const,
  gifts: (params?: GiftQueryParams) => [...giftingKeys.all, 'gifts', params] as const,
  gift: (id: string) => [...giftingKeys.all, 'gift', id] as const,
  lists: () => [...giftingKeys.all, 'lists'] as const,
  list: (id: string) => [...giftingKeys.all, 'list', id] as const,
  health: () => [...giftingKeys.all, 'health'] as const,
};

/**
 * Hook to fetch all gifts
 */
export function useGifts(
  params?: GiftQueryParams
): UseQueryResult<Gift[], Error> {
  return useQuery({
    queryKey: giftingKeys.gifts(params),
    queryFn: () => fetchGifts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch a single gift by ID
 */
export function useGift(id: string): UseQueryResult<Gift | null, Error> {
  return useQuery({
    queryKey: giftingKeys.gift(id),
    queryFn: () => fetchGiftById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to create a gift
 */
export function useCreateGift(): UseMutationResult<Gift, Error, CreateGiftRequest> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGift,
    onSuccess: () => {
      // Invalidate gifts list to refetch
      queryClient.invalidateQueries({ queryKey: giftingKeys.gifts() });
    },
  });
}

/**
 * Hook to update a gift
 */
export function useUpdateGift(): UseMutationResult<
  Gift,
  Error,
  { id: string; data: UpdateGiftRequest }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateGift(id, data),
    onSuccess: (data) => {
      // Invalidate specific gift and list
      queryClient.invalidateQueries({ queryKey: giftingKeys.gift(data.id) });
      queryClient.invalidateQueries({ queryKey: giftingKeys.gifts() });
    },
  });
}

/**
 * Hook to delete a gift
 */
export function useDeleteGift(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGift,
    onSuccess: () => {
      // Invalidate gifts list
      queryClient.invalidateQueries({ queryKey: giftingKeys.gifts() });
    },
  });
}

/**
 * Hook to fetch all gift lists
 */
export function useGiftLists(): UseQueryResult<GiftList[], Error> {
  return useQuery({
    queryKey: giftingKeys.lists(),
    queryFn: fetchGiftLists,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single gift list by ID
 */
export function useGiftList(id: string): UseQueryResult<GiftList | null, Error> {
  return useQuery({
    queryKey: giftingKeys.list(id),
    queryFn: () => fetchGiftListById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to create a gift list
 */
export function useCreateGiftList(): UseMutationResult<
  GiftList,
  Error,
  CreateGiftListRequest
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGiftList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: giftingKeys.lists() });
    },
  });
}

/**
 * Hook to add item to gift list
 */
export function useAddItemToList(): UseMutationResult<
  GiftItem,
  Error,
  { listId: string; data: AddItemToListRequest }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId, data }) => addItemToList(listId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: giftingKeys.list(variables.listId) });
      queryClient.invalidateQueries({ queryKey: giftingKeys.lists() });
    },
  });
}

/**
 * Hook to remove item from gift list
 */
export function useRemoveItemFromList(): UseMutationResult<
  void,
  Error,
  { listId: string; itemId: string }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId, itemId }) => removeItemFromList(listId, itemId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: giftingKeys.list(variables.listId) });
      queryClient.invalidateQueries({ queryKey: giftingKeys.lists() });
    },
  });
}

/**
 * Hook to check API health
 */
export function useApiHealth(): UseQueryResult<boolean, Error> {
  return useQuery({
    queryKey: giftingKeys.health(),
    queryFn: checkHealth,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 5 * 60 * 1000, // Check every 5 minutes
  });
}




