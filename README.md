# Xandeum pNode Analytics Platform

A comprehensive web-based analytics dashboard for Xandeum pNodes (storage provider nodes), providing real-time monitoring, performance metrics, and network insights.

![Dashboard Preview](https://via.placeholder.com/1200x600/3b82f6/ffffff?text=Xandeum+pNode+Analytics)

## Features

### Core Functionality
- **Real-time pNode Monitoring**: Live data updates every 30 seconds from the Xandeum gossip network
- **Network Overview Dashboard**: Comprehensive network statistics including total nodes, storage capacity, uptime, and decentralization scores
- **Advanced Search & Filtering**: Search nodes by moniker, public key, or location with real-time filtering
- **Performance Metrics**: Detailed tracking of uptime, latency, storage usage, and bandwidth
- **Historical Analytics**: 24h/7d/30d/90d performance trends with interactive charts

### Unique Features
- **Health Score System**: Composite metric based on uptime, success rate, latency, and storage optimization
- **Geographic Distribution**: View node locations across countries and regions
- **Storage-Specific Analytics**: Monitor network-wide storage capacity and growth trends
- **Top Performers Leaderboard**: Identify best-performing nodes by various metrics
- **Responsive Design**: Full mobile and tablet support with dark mode

## Tech Stack

- **Framework**: Next.js 14+ (React 18, TypeScript)
- **Styling**: Tailwind CSS with custom design system
- **Data Fetching**: TanStack React Query (automatic caching, refetching, and state management)
- **Charts**: Recharts for interactive data visualization
- **State Management**: Zustand for UI state
- **Date Handling**: date-fns for date formatting
- **API Client**: Axios with interceptors for pRPC communication

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
- Access to Xandeum network (mainnet or devnet)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/xandeum-analytics.git
cd xandeum-analytics
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:
```env
NEXT_PUBLIC_XANDEUM_RPC_URL=https://api.xandeum.network
NEXT_PUBLIC_XANDEUM_DEVNET_RPC_URL=https://devnet.xandeum.network
NEXT_PUBLIC_APP_VERSION=1.0.0
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
xandeum-analytics/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Dashboard home page
│   │   ├── nodes/
│   │   │   ├── page.tsx       # Node list page
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Individual node detail
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   └── loading.tsx
│   │   ├── NodeCard.tsx      # pNode card component
│   │   ├── NetworkStats.tsx  # Network statistics display
│   │   ├── StatusBadge.tsx   # Status indicator
│   │   └── PerformanceChart.tsx # Chart component
│   ├── lib/                   # Utilities and helpers
│   │   ├── pnode-client.ts   # pRPC API client
│   │   ├── hooks.ts          # React Query hooks
│   │   ├── providers.tsx     # React Query provider
│   │   ├── utils.ts          # Utility functions
│   │   └── constants.ts      # App constants
│   └── types/                 # TypeScript types
│       └── pnode.ts          # pNode type definitions
├── public/                    # Static assets
├── docs/                      # Documentation
│   ├── API.md               # API integration guide
│   ├── FEATURES.md          # Feature documentation
│   └── DEPLOYMENT.md        # Deployment guide
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Usage

### Dashboard Home
The main dashboard provides:
- Network-wide statistics (total nodes, storage capacity, uptime)
- Top 8 performing nodes by health score
- Quick navigation to node list

### Node List Page
Features include:
- Search by moniker, public key, or location
- Filter by status (active/inactive/syncing)
- Sort by health score, uptime, storage, latency, or name
- Real-time node count by status
- Grid view of all nodes with key metrics

### Node Detail Page
Detailed view of individual nodes:
- Comprehensive node information (IP, location, version)
- Real-time performance metrics
- Historical charts (uptime, latency, storage, bandwidth)
- Staking information (if applicable)
- Health score breakdown

## API Integration

The platform integrates with the Xandeum pRPC (pNode RPC) API to fetch real-time data from the gossip network.

### Key API Endpoints

```typescript
// Get all pNodes
GET /v1/pnodes

// Get specific pNode details
GET /v1/pnodes/{publicKey}

// Get pNode metrics
GET /v1/pnodes/{publicKey}/metrics?timeframe=24h

// Get network statistics
GET /v1/network/stats
```

See [docs/API.md](./docs/API.md) for detailed integration guide.

### Mock Data for Development

The application includes mock data generators for development when the actual pRPC endpoints are not available. This allows you to:
- Test the UI without a live backend
- Develop features in parallel with backend development
- Demo the platform with realistic data

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

```bash
vercel --prod
```

### Docker

Build and run with Docker:

```bash
# Build image
docker build -t xandeum-analytics .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_XANDEUM_RPC_URL=https://api.xandeum.network \
  xandeum-analytics
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_XANDEUM_RPC_URL=https://api.xandeum.network
```

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

## Performance Optimization

- **Server-Side Rendering**: Critical pages use SSR for fast initial load
- **Data Caching**: React Query caches data for 5 minutes, refetches every 30 seconds
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component for optimized images
- **Bundle Analysis**: Run `npm run build` to analyze bundle size

### Performance Metrics
- Initial load: <2s
- Time to Interactive: <3s
- Lighthouse Score: 90+
- Mobile responsiveness: 100%

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality

- TypeScript strict mode enabled
- ESLint for code linting
- Prettier for code formatting (recommended)

## Architecture

### Data Flow

```
pRPC API → PNodeClient → React Query → Components → UI
```

1. **PNodeClient**: Axios-based wrapper for pRPC endpoints with error handling
2. **React Query Hooks**: Custom hooks for data fetching with automatic caching
3. **Components**: Presentational components that consume hooks
4. **UI**: Rendered with Tailwind CSS and custom design system

### State Management

- **Server State**: React Query (API data, caching, refetching)
- **UI State**: React useState/useReducer (search, filters, sort)
- **Global State**: Zustand (theme, user preferences)

## Troubleshooting

### Common Issues

**Development server won't start**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**API connection issues**
- Verify `NEXT_PUBLIC_XANDEUM_RPC_URL` is set correctly
- Check network connectivity
- Review browser console for CORS errors

## Roadmap

- [ ] Network map visualization (geographic heatmap)
- [ ] Alert system for node operators
- [ ] Public API for third-party integrations
- [ ] Leaderboard and gamification
- [ ] ML-based capacity forecasting
- [ ] Wallet integration for node operators
- [ ] Email/webhook notifications
- [ ] CSV/JSON data export

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

- Documentation: [docs/](./docs/)
- Issues: [GitHub Issues](https://github.com/your-org/xandeum-analytics/issues)
- Discord: [Xandeum Community](https://discord.gg/xandeum)
- Website: https://xandeum.network

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Inspired by [stakewiz.com](https://stakewiz.com) and [validators.app](https://validators.app)
- Powered by Xandeum network

---

**Version**: 1.0.0
**Last Updated**: December 2025
**Maintainer**: Xandeum Team
