# pRPC Integration Guide

## Overview

This guide helps you integrate real Xandeum pRPC (pNode RPC) endpoints into the analytics platform.

## Current Status

The platform currently uses **mock data** for development. All API calls in `src/lib/pnode-client.ts` have fallback mock data generators.

## Integration Steps

### Step 1: Get pRPC Endpoint URLs

Visit https://xandeum.network/docs to find:
- Mainnet pRPC endpoint
- Devnet pRPC endpoint
- Available RPC methods
- Authentication requirements (if any)

### Step 2: Update Environment Variables

Create or update `.env.local`:

```env
# Xandeum pRPC Endpoints
NEXT_PUBLIC_XANDEUM_RPC_URL=https://api.xandeum.network/rpc
NEXT_PUBLIC_XANDEUM_DEVNET_RPC_URL=https://devnet.xandeum.network/rpc

# Optional: API Key if required
NEXT_PUBLIC_XANDEUM_API_KEY=your_api_key_here
```

### Step 3: Understand pRPC Methods

Based on typical Solana-compatible RPC, expected methods might include:

```typescript
// Get all pNodes from gossip
rpc.getClusterNodes()

// Get node info
rpc.getNodeInfo(publicKey)

// Get performance samples
rpc.getRecentPerformanceSamples()

// Get version info
rpc.getVersion()
```

### Step 4: Update PNodeClient

Open `src/lib/pnode-client.ts` and replace mock data calls.

**Example: getAllPNodes()**

```typescript
async getAllPNodes(): Promise<PNode[]> {
  try {
    // Call actual pRPC method
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      id: 1,
      method: 'getClusterNodes',
      params: []
    });

    if (response.data.result) {
      // Transform pRPC response to our PNode format
      return this.transformRPCNodesToPNodes(response.data.result);
    }

    throw new Error('No result from pRPC');
  } catch (error) {
    console.error('Error fetching pNodes from pRPC:', error);

    // Fallback to mock data in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock data - pRPC call failed');
      return this.getMockPNodes();
    }

    throw error;
  }
}
```

### Step 5: Data Transformation

Create transformation functions to map pRPC responses to our data types:

```typescript
private transformRPCNodesToPNodes(rpcNodes: any[]): PNode[] {
  return rpcNodes.map(rpcNode => ({
    publicKey: rpcNode.pubkey,
    moniker: this.extractMoniker(rpcNode),
    ipAddress: rpcNode.gossip?.split(':')[0] || 'unknown',
    version: rpcNode.version || 'unknown',
    status: this.determineStatus(rpcNode),
    uptime: this.calculateUptime(rpcNode),
    storage: this.extractStorageInfo(rpcNode),
    performance: this.extractPerformanceMetrics(rpcNode),
    location: this.extractLocation(rpcNode),
    lastSeen: new Date(rpcNode.lastSeen || Date.now()),
    stakingInfo: this.extractStakingInfo(rpcNode),
    healthScore: this.calculateHealthScore(rpcNode),
  }));
}
```

### Step 6: Handle pRPC-Specific Fields

**Solana/Xandeum-specific fields:**

```typescript
interface XandeumRPCNode {
  pubkey: string;
  gossip: string;  // IP:PORT
  tpu: string;     // Transaction Processing Unit
  rpc: string;     // RPC endpoint
  version: string;
  featureSet: number;
  shredVersion: number;
}
```

Map these to our PNode type.

### Step 7: Add Storage Metrics

If pRPC provides storage data:

```typescript
private extractStorageInfo(rpcNode: any): StorageInfo {
  // Check if pRPC provides storage metrics
  const storageData = rpcNode.storage || rpcNode.metrics?.storage;

  if (storageData) {
    return {
      used: storageData.used,
      total: storageData.total,
      available: storageData.available,
      usagePercentage: (storageData.used / storageData.total) * 100,
    };
  }

  // If not available, use placeholders or estimate
  return {
    used: 0,
    total: 0,
    available: 0,
    usagePercentage: 0,
  };
}
```

### Step 8: Add Error Handling

```typescript
async getAllPNodes(): Promise<PNode[]> {
  try {
    const response = await this.client.post('', {
      jsonrpc: '2.0',
      id: 1,
      method: 'getClusterNodes',
      params: []
    });

    if (response.data.error) {
      throw new Error(`pRPC Error: ${response.data.error.message}`);
    }

    return this.transformRPCNodesToPNodes(response.data.result);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Network error:', error.message);

      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    }

    // Development fallback
    if (process.env.NODE_ENV === 'development') {
      return this.getMockPNodes();
    }

    throw error;
  }
}
```

### Step 9: Test Connection

Create a test endpoint to verify pRPC connection:

```typescript
// src/app/api/test-prpc/route.ts
import { NextResponse } from 'next/server';
import { getPNodeClient } from '@/lib/pnode-client';

export async function GET() {
  try {
    const client = getPNodeClient();
    const nodes = await client.getAllPNodes();

    return NextResponse.json({
      success: true,
      nodeCount: nodes.length,
      sampleNode: nodes[0],
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
```

Visit http://localhost:3000/api/test-prpc to test.

### Step 10: Gradual Rollout

1. **Start with one method** - Get `getAllPNodes()` working first
2. **Keep mock fallback** - Use mock data if pRPC fails
3. **Test thoroughly** - Verify data transformation
4. **Add remaining methods** - Implement others once first works
5. **Remove mocks** - Once stable, remove mock data

## Common Issues

### Issue: CORS Errors

If you get CORS errors, you may need a proxy:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/prpc/:path*',
        destination: 'https://api.xandeum.network/rpc/:path*',
      },
    ];
  },
};
```

Then use `/api/prpc` instead of direct URL.

### Issue: Rate Limiting

Add request caching and rate limiting:

```typescript
const cache = new Map<string, { data: any; timestamp: number }>();

async getAllPNodes(): Promise<PNode[]> {
  const cacheKey = 'all-pnodes';
  const cached = cache.get(cacheKey);

  // Return cached data if less than 30 seconds old
  if (cached && Date.now() - cached.timestamp < 30000) {
    return cached.data;
  }

  const nodes = await this.fetchFromPRPC();
  cache.set(cacheKey, { data: nodes, timestamp: Date.now() });

  return nodes;
}
```

### Issue: Missing Storage Data

If pRPC doesn't provide storage metrics, you may need:
1. Additional API endpoints
2. Separate storage monitoring service
3. Estimated values based on other metrics

## Testing Checklist

- [ ] Environment variables set correctly
- [ ] pRPC endpoint accessible
- [ ] `getAllPNodes()` returns data
- [ ] Data transformation works
- [ ] UI displays real data correctly
- [ ] Error handling works (disconnect network to test)
- [ ] Mock fallback works in development
- [ ] Performance acceptable (< 3s load time)

## Next Steps

1. Visit https://xandeum.network/docs
2. Get actual pRPC endpoint URLs
3. Test connection with curl or Postman
4. Update `pnode-client.ts` with real implementation
5. Test thoroughly
6. Deploy to production

## Support

- Xandeum Discord: https://discord.gg/uqRSmmM5m
- Documentation: https://xandeum.network/docs
- GitHub Issues: [Your repo]/issues
