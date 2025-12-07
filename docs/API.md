# API Integration Guide

This document provides detailed information about integrating with the Xandeum pRPC (pNode RPC) API.

## Overview

The Xandeum pNode Analytics platform communicates with the Xandeum gossip network through the pRPC API to retrieve real-time data about storage provider nodes.

## Base URLs

```
Mainnet: https://api.xandeum.network
Devnet:  https://devnet.xandeum.network
```

## Authentication

Currently, the pRPC API does not require authentication. Future versions may include API key authentication for rate limiting.

## API Endpoints

### 1. Get All pNodes

Retrieve a list of all pNodes on the network.

**Endpoint:** `GET /v1/pnodes`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "publicKey": "pNode0001...abc123",
      "moniker": "pNode-NewYork-1",
      "ipAddress": "192.168.1.100",
      "version": "v1.5.2",
      "status": "active",
      "uptime": 99.8,
      "storage": {
        "used": 107374182400,
        "total": 214748364800,
        "available": 107374182400,
        "usagePercentage": 50.0
      },
      "performance": {
        "avgLatency": 45.2,
        "successRate": 99.9,
        "bandwidthMbps": 850.5,
        "responseTime": 38.7,
        "requestsPerSecond": 542
      },
      "location": {
        "country": "United States",
        "countryCode": "US",
        "city": "New York",
        "region": "New York",
        "lat": 40.7128,
        "lng": -74.0060,
        "timezone": "America/New_York"
      },
      "lastSeen": "2025-12-07T00:00:00.000Z",
      "stakingInfo": {
        "staked": 500000,
        "weight": 2.5,
        "rewards": 5420,
        "delegators": 42
      },
      "healthScore": 98.5
    }
  ],
  "timestamp": "2025-12-07T00:00:00.000Z"
}
```

### 2. Get pNode Details

Retrieve detailed information about a specific pNode.

**Endpoint:** `GET /v1/pnodes/{publicKey}`

**Parameters:**
- `publicKey` (path parameter): The public key of the pNode

**Response:**
```json
{
  "success": true,
  "data": {
    "publicKey": "pNode0001...abc123",
    "moniker": "pNode-NewYork-1",
    // ... (same structure as above)
  },
  "timestamp": "2025-12-07T00:00:00.000Z"
}
```

### 3. Get pNode Metrics

Retrieve historical performance metrics for a specific pNode.

**Endpoint:** `GET /v1/pnodes/{publicKey}/metrics`

**Parameters:**
- `publicKey` (path parameter): The public key of the pNode
- `timeframe` (query parameter): Time range for metrics (`24h`, `7d`, `30d`, `90d`)

**Response:**
```json
{
  "success": true,
  "data": {
    "publicKey": "pNode0001...abc123",
    "timeframe": "24h",
    "metrics": {
      "uptime": [
        {
          "timestamp": "2025-12-06T23:00:00.000Z",
          "value": 99.8,
          "metric": "uptime"
        }
      ],
      "storage": [
        {
          "timestamp": "2025-12-06T23:00:00.000Z",
          "value": 107374182400,
          "metric": "storage"
        }
      ],
      "latency": [
        {
          "timestamp": "2025-12-06T23:00:00.000Z",
          "value": 45.2,
          "metric": "latency"
        }
      ],
      "bandwidth": [
        {
          "timestamp": "2025-12-06T23:00:00.000Z",
          "value": 850.5,
          "metric": "bandwidth"
        }
      ]
    }
  },
  "timestamp": "2025-12-07T00:00:00.000Z"
}
```

### 4. Get Network Statistics

Retrieve network-wide statistics.

**Endpoint:** `GET /v1/network/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalNodes": 50,
    "activeNodes": 45,
    "inactiveNodes": 3,
    "syncingNodes": 2,
    "totalStorage": 10737418240000,
    "usedStorage": 5368709120000,
    "availableStorage": 5368709120000,
    "avgUptime": 99.5,
    "decentralizationScore": 87.3,
    "networkVersion": "v1.5.2",
    "avgLatency": 52.8,
    "totalBandwidth": 42750.0
  },
  "timestamp": "2025-12-07T00:00:00.000Z"
}
```

## Error Handling

All API endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message here",
  "timestamp": "2025-12-07T00:00:00.000Z"
}
```

### Common Error Codes

- `400 Bad Request`: Invalid parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Service temporarily unavailable

## Rate Limiting

Currently, there are no rate limits enforced. However, it's recommended to:
- Cache responses for at least 30 seconds
- Use efficient polling intervals (30-60 seconds)
- Implement exponential backoff for retries

## Implementation Example

### Using the PNodeClient Class

```typescript
import { PNodeClient } from '@/lib/pnode-client';

// Initialize client
const client = new PNodeClient('mainnet');

// Get all pNodes
const nodes = await client.getAllPNodes();

// Get specific pNode
const node = await client.getPNodeDetails('pNode0001...abc123');

// Get metrics
const metrics = await client.getPNodeMetrics('pNode0001...abc123', '24h');

// Get network stats
const stats = await client.getNetworkStats();
```

### Using React Query Hooks

```typescript
import { useAllPNodes, usePNodeDetails, usePNodeMetrics, useNetworkStats } from '@/lib/hooks';

function MyComponent() {
  // Fetch all pNodes
  const { data: nodes, isLoading, error } = useAllPNodes();

  // Fetch specific pNode
  const { data: node } = usePNodeDetails('pNode0001...abc123');

  // Fetch metrics
  const { data: metrics } = usePNodeMetrics('pNode0001...abc123', '24h');

  // Fetch network stats
  const { data: stats } = useNetworkStats();

  // Component logic...
}
```

## Mock Data Mode

When the actual pRPC API is unavailable, the PNodeClient automatically falls back to mock data generation. This is useful for:

- Development without backend access
- Testing and demos
- Local development

To force mock mode, simply point to an invalid endpoint in your environment variables.

## Best Practices

1. **Caching**: Always cache API responses to minimize network calls
2. **Error Handling**: Implement proper error handling and user feedback
3. **Retry Logic**: Use exponential backoff for failed requests
4. **Monitoring**: Log API errors for debugging
5. **Data Validation**: Validate API responses before using them

## WebSocket Support (Future)

Future versions will include WebSocket support for real-time updates:

```typescript
const ws = new WebSocket('wss://api.xandeum.network/v1/ws');

ws.on('pnode-update', (data) => {
  console.log('pNode updated:', data);
});
```

## Additional Resources

- [Xandeum Documentation](https://xandeum.network/docs)
- [API Status Page](https://status.xandeum.network)
- [Developer Discord](https://discord.gg/xandeum)

## Support

For API issues or questions:
- Email: api-support@xandeum.network
- Discord: #developer-support channel
- GitHub Issues: [Create an issue](https://github.com/xandeum/pnode-analytics/issues)
