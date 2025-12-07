import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getPNodeClient } from './pnode-client';
import type { PNode, NetworkStats, PNodeMetrics } from '@/types/pnode';

/**
 * Custom React Query hooks for pNode data fetching
 */

/**
 * Hook to fetch all pNodes
 */
export function useAllPNodes(): UseQueryResult<PNode[], Error> {
  return useQuery({
    queryKey: ['pnodes'],
    queryFn: async () => {
      const client = getPNodeClient();
      return await client.getAllPNodes();
    },
  });
}

/**
 * Hook to fetch a specific pNode by public key
 */
export function usePNodeDetails(publicKey: string): UseQueryResult<PNode | null, Error> {
  return useQuery({
    queryKey: ['pnode', publicKey],
    queryFn: async () => {
      const client = getPNodeClient();
      return await client.getPNodeDetails(publicKey);
    },
    enabled: !!publicKey,
  });
}

/**
 * Hook to fetch pNode metrics
 */
export function usePNodeMetrics(
  publicKey: string,
  timeframe: '24h' | '7d' | '30d' | '90d' = '24h'
): UseQueryResult<PNodeMetrics | null, Error> {
  return useQuery({
    queryKey: ['pnode-metrics', publicKey, timeframe],
    queryFn: async () => {
      const client = getPNodeClient();
      return await client.getPNodeMetrics(publicKey, timeframe);
    },
    enabled: !!publicKey,
  });
}

/**
 * Hook to fetch network statistics
 */
export function useNetworkStats(): UseQueryResult<NetworkStats, Error> {
  return useQuery({
    queryKey: ['network-stats'],
    queryFn: async () => {
      const client = getPNodeClient();
      return await client.getNetworkStats();
    },
  });
}

/**
 * Hook to fetch pNodes by status
 */
export function usePNodesByStatus(
  status: 'active' | 'inactive' | 'syncing'
): UseQueryResult<PNode[], Error> {
  return useQuery({
    queryKey: ['pnodes-by-status', status],
    queryFn: async () => {
      const client = getPNodeClient();
      return await client.getPNodesByStatus(status);
    },
  });
}

/**
 * Hook to search pNodes
 */
export function useSearchPNodes(query: string): UseQueryResult<PNode[], Error> {
  return useQuery({
    queryKey: ['search-pnodes', query],
    queryFn: async () => {
      const client = getPNodeClient();
      return await client.searchPNodes(query);
    },
    enabled: query.length >= 2,
  });
}
