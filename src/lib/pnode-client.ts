import axios, { AxiosInstance } from 'axios';
import type {
  PNode,
  NetworkStats,
  PNodeMetrics,
  PNodeApiResponse,
  NetworkStatsApiResponse,
  MetricsApiResponse,
} from '@/types/pnode';
import { API_CONFIG, DEFAULT_NETWORK, NETWORK_TYPES } from './constants';

/**
 * pRPC Client for Xandeum Network Integration
 * Handles communication with pNode gossip network
 */
export class PNodeClient {
  private client: AxiosInstance;
  private network: typeof NETWORK_TYPES.MAINNET | typeof NETWORK_TYPES.DEVNET;

  constructor(network: typeof NETWORK_TYPES.MAINNET | typeof NETWORK_TYPES.DEVNET = DEFAULT_NETWORK) {
    this.network = network;

    const baseURL = network === NETWORK_TYPES.MAINNET
      ? API_CONFIG.MAINNET_URL
      : API_CONFIG.DEVNET_URL;

    this.client = axios.create({
      baseURL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[pRPC Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[pRPC Request Error]', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[pRPC Response] ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('[pRPC Response Error]', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get all pNodes from the gossip network
   */
  async getAllPNodes(): Promise<PNode[]> {
    try {
      // TODO: Replace with actual pRPC endpoint from xandeum.network/docs
      // This is a placeholder implementation
      const response = await this.client.get<PNodeApiResponse>('/v1/pnodes');

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || 'Failed to fetch pNodes');
    } catch (error) {
      console.error('Error fetching all pNodes:', error);

      // Return mock data for development
      return this.getMockPNodes();
    }
  }

  /**
   * Get details for a specific pNode by public key
   */
  async getPNodeDetails(publicKey: string): Promise<PNode | null> {
    try {
      // TODO: Replace with actual pRPC endpoint
      const response = await this.client.get<{ success: boolean; data: PNode; error?: string }>(
        `/v1/pnodes/${publicKey}`
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || 'Failed to fetch pNode details');
    } catch (error) {
      console.error(`Error fetching pNode details for ${publicKey}:`, error);

      // Return mock data for development
      const mockNodes = this.getMockPNodes();
      return mockNodes.find(node => node.publicKey === publicKey) || null;
    }
  }

  /**
   * Get historical metrics for a specific pNode
   */
  async getPNodeMetrics(
    publicKey: string,
    timeframe: '24h' | '7d' | '30d' | '90d' = '24h'
  ): Promise<PNodeMetrics | null> {
    try {
      // TODO: Replace with actual pRPC endpoint
      const response = await this.client.get<MetricsApiResponse>(
        `/v1/pnodes/${publicKey}/metrics`,
        { params: { timeframe } }
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || 'Failed to fetch pNode metrics');
    } catch (error) {
      console.error(`Error fetching metrics for ${publicKey}:`, error);

      // Return mock data for development
      return this.getMockMetrics(publicKey, timeframe);
    }
  }

  /**
   * Get network-wide statistics
   */
  async getNetworkStats(): Promise<NetworkStats> {
    try {
      // TODO: Replace with actual pRPC endpoint
      const response = await this.client.get<NetworkStatsApiResponse>('/v1/network/stats');

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || 'Failed to fetch network stats');
    } catch (error) {
      console.error('Error fetching network stats:', error);

      // Return mock data for development
      return this.getMockNetworkStats();
    }
  }

  /**
   * Search pNodes by moniker or public key
   */
  async searchPNodes(query: string): Promise<PNode[]> {
    try {
      const allNodes = await this.getAllPNodes();
      const lowercaseQuery = query.toLowerCase();

      return allNodes.filter(node =>
        node.moniker.toLowerCase().includes(lowercaseQuery) ||
        node.publicKey.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error('Error searching pNodes:', error);
      return [];
    }
  }

  /**
   * Get pNodes by status
   */
  async getPNodesByStatus(status: 'active' | 'inactive' | 'syncing'): Promise<PNode[]> {
    try {
      const allNodes = await this.getAllPNodes();
      return allNodes.filter(node => node.status === status);
    } catch (error) {
      console.error(`Error fetching ${status} pNodes:`, error);
      return [];
    }
  }

  // Mock data generators for development
  private getMockPNodes(): PNode[] {
    const mockNodes: PNode[] = [];
    const countries = [
      { country: 'United States', countryCode: 'US', city: 'New York', lat: 40.7128, lng: -74.0060 },
      { country: 'Germany', countryCode: 'DE', city: 'Berlin', lat: 52.5200, lng: 13.4050 },
      { country: 'Singapore', countryCode: 'SG', city: 'Singapore', lat: 1.3521, lng: 103.8198 },
      { country: 'Japan', countryCode: 'JP', city: 'Tokyo', lat: 35.6762, lng: 139.6503 },
      { country: 'United Kingdom', countryCode: 'GB', city: 'London', lat: 51.5074, lng: -0.1278 },
      { country: 'Canada', countryCode: 'CA', city: 'Toronto', lat: 43.6532, lng: -79.3832 },
      { country: 'Australia', countryCode: 'AU', city: 'Sydney', lat: -33.8688, lng: 151.2093 },
      { country: 'France', countryCode: 'FR', city: 'Paris', lat: 48.8566, lng: 2.3522 },
    ];

    for (let i = 0; i < 50; i++) {
      const location = countries[i % countries.length];
      const uptime = 90 + Math.random() * 10;
      const successRate = 95 + Math.random() * 5;
      const storageUsed = Math.random() * 100 * 1024 * 1024 * 1024 * 1024; // TB
      const storageTotal = 200 * 1024 * 1024 * 1024 * 1024; // 200 TB

      mockNodes.push({
        publicKey: `pNode${i.toString().padStart(4, '0')}...${Math.random().toString(36).substring(2, 10)}`,
        moniker: `pNode-${location.city}-${i + 1}`,
        ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        version: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
        status: Math.random() > 0.1 ? 'active' : (Math.random() > 0.5 ? 'syncing' : 'inactive'),
        uptime,
        storage: {
          used: storageUsed,
          total: storageTotal,
          available: storageTotal - storageUsed,
          usagePercentage: (storageUsed / storageTotal) * 100,
        },
        performance: {
          avgLatency: 50 + Math.random() * 200,
          successRate,
          bandwidthMbps: 100 + Math.random() * 900,
          responseTime: 20 + Math.random() * 180,
          requestsPerSecond: Math.floor(Math.random() * 1000),
        },
        location: {
          ...location,
          region: location.city,
          timezone: 'UTC',
        },
        lastSeen: new Date(Date.now() - Math.random() * 3600000),
        stakingInfo: {
          staked: Math.floor(Math.random() * 1000000),
          weight: Math.random() * 5,
          rewards: Math.floor(Math.random() * 10000),
          delegators: Math.floor(Math.random() * 100),
        },
        healthScore: (uptime * 0.4 + successRate * 0.6),
      });
    }

    return mockNodes;
  }

  private getMockNetworkStats(): NetworkStats {
    const mockNodes = this.getMockPNodes();
    const activeNodes = mockNodes.filter(n => n.status === 'active').length;
    const totalStorage = mockNodes.reduce((sum, n) => sum + n.storage.total, 0);
    const usedStorage = mockNodes.reduce((sum, n) => sum + n.storage.used, 0);
    const avgUptime = mockNodes.reduce((sum, n) => sum + n.uptime, 0) / mockNodes.length;

    return {
      totalNodes: mockNodes.length,
      activeNodes,
      inactiveNodes: mockNodes.filter(n => n.status === 'inactive').length,
      syncingNodes: mockNodes.filter(n => n.status === 'syncing').length,
      totalStorage,
      usedStorage,
      availableStorage: totalStorage - usedStorage,
      avgUptime,
      decentralizationScore: 75 + Math.random() * 20,
      networkVersion: 'v1.5.2',
      avgLatency: mockNodes.reduce((sum, n) => sum + n.performance.avgLatency, 0) / mockNodes.length,
      totalBandwidth: mockNodes.reduce((sum, n) => sum + n.performance.bandwidthMbps, 0),
    };
  }

  private getMockMetrics(publicKey: string, timeframe: string): PNodeMetrics {
    const points = timeframe === '24h' ? 24 : (timeframe === '7d' ? 168 : 720);
    const now = Date.now();

    return {
      publicKey,
      timeframe: timeframe as '24h' | '7d' | '30d' | '90d',
      metrics: {
        uptime: Array.from({ length: points }, (_, i) => ({
          timestamp: new Date(now - (points - i) * 3600000),
          value: 95 + Math.random() * 5,
          metric: 'uptime',
        })),
        storage: Array.from({ length: points }, (_, i) => ({
          timestamp: new Date(now - (points - i) * 3600000),
          value: (50 + i * 0.1 + Math.random() * 5) * 1024 * 1024 * 1024 * 1024,
          metric: 'storage',
        })),
        latency: Array.from({ length: points }, (_, i) => ({
          timestamp: new Date(now - (points - i) * 3600000),
          value: 50 + Math.random() * 150,
          metric: 'latency',
        })),
        bandwidth: Array.from({ length: points }, (_, i) => ({
          timestamp: new Date(now - (points - i) * 3600000),
          value: 500 + Math.random() * 500,
          metric: 'bandwidth',
        })),
      },
    };
  }
}

// Singleton instance
let clientInstance: PNodeClient | null = null;

/**
 * Get or create PNodeClient singleton instance
 */
export function getPNodeClient(
  network?: typeof NETWORK_TYPES.MAINNET | typeof NETWORK_TYPES.DEVNET
): PNodeClient {
  if (!clientInstance || (network && clientInstance['network'] !== network)) {
    clientInstance = new PNodeClient(network);
  }
  return clientInstance;
}

export default PNodeClient;
