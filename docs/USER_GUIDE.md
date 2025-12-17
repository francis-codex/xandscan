# XandScan User Guide

Complete guide for using the XandScan platform to explore and analyze Xandeum pNodes.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Node List View](#node-list-view)
4. [Node Details View](#node-details-view)
5. [Search & Filters](#search--filters)
6. [Understanding Metrics](#understanding-metrics)
7. [Data Export](#data-export)
8. [FAQ](#faq)

## Getting Started

### Accessing XandScan

Visit the live XandScan platform at your deployed URL (e.g., `https://your-app.up.railway.app`).

No registration or wallet connection required - XandScan is completely free to use!

### First Look

When you land on XandScan, you'll see:
- **Network Statistics**: Overview of the entire Xandeum pNode network
- **Top Nodes**: Best performing pNodes by health score
- **Navigation Menu**: Easy access to all platform features

### Navigation

- **Home/Dashboard**: Network overview and statistics
- **All Nodes**: Complete list of all pNodes in the network
- **Individual Node Pages**: Detailed analytics for specific nodes
- **Search Bar**: Quick search for nodes by name, public key, or location

## Dashboard Overview

The main dashboard provides a bird's-eye view of the Xandeum network.

### Network Statistics Cards

#### Total Nodes
- Shows the total number of pNodes in the network
- Color-coded by status:
  - **Green**: Active nodes
  - **Yellow**: Syncing nodes
  - **Red**: Inactive nodes

#### Total Storage Capacity
- Network-wide storage available
- Displayed in human-readable format (TB, PB, EB)
- Represents total capacity across all active nodes

#### Average Uptime
- Network-wide average uptime percentage
- Calculated from all active nodes
- Higher is better (90%+ is excellent)

#### Decentralization Score
- Measures geographic distribution of nodes
- Score from 0-100 (higher is better)
- Based on:
  - Number of unique countries
  - Number of unique regions
  - Distribution evenness

### Top Performing Nodes

The dashboard highlights the top 8 nodes by health score.

**Health Score Components**:
- **Uptime**: How often the node is online
- **Success Rate**: Percentage of successful operations
- **Latency**: Response time (lower is better)
- **Storage Efficiency**: How well storage is utilized

**What Each Card Shows**:
- Node moniker (name)
- Location (country flag + city)
- Health score (0-100)
- Status badge (Active/Syncing/Inactive)
- Key metrics (uptime, storage, latency)

## Node List View

Access via the "View All Nodes" button or navigation menu.

### Understanding the Node Grid

Each node card displays:

1. **Header**:
   - Node moniker
   - Status badge
   - Health score

2. **Location**:
   - Country flag
   - City and region
   - Public IP address

3. **Performance Metrics**:
   - **Uptime**: Percentage of time node is online
   - **Latency**: Average response time in milliseconds
   - **Storage**: Used / Total capacity
   - **Bandwidth**: Data transfer rate

4. **Actions**:
   - Click card to view detailed analytics
   - Click public key to copy

### Node Status Indicators

| Status | Color | Meaning |
|--------|-------|---------|
| **Active** | Green | Node is online and functioning normally |
| **Syncing** | Yellow | Node is catching up with the network |
| **Inactive** | Red | Node is offline or unresponsive |
| **Unknown** | Gray | Node status cannot be determined |

### Node Count Summary

At the top of the page:
- **Total Nodes**: All nodes in the network
- **Active**: Currently online nodes
- **Syncing**: Nodes catching up
- **Inactive**: Offline nodes

## Node Details View

Click any node card to access detailed analytics.

### Node Information Panel

**Basic Info**:
- Moniker (node name)
- Public key (click to copy)
- IP address and port
- Geographic location
- Version information

**Network Info**:
- Network ID
- Peer connections
- Protocol version
- Last seen timestamp

### Performance Metrics

#### Current Stats
- **Uptime**: Real-time uptime percentage
- **Success Rate**: Successful operations / total operations
- **Latency**: Current response time
- **Storage Used**: Used storage / Total capacity
- **Bandwidth**: Current data transfer rate

#### Historical Charts

**Uptime History** (24h/7d/30d/90d):
- Line chart showing uptime over time
- Green = high uptime, red = low uptime
- Hover for exact values

**Latency Trends**:
- Track response time changes
- Identify performance improvements or degradations
- Lower is better

**Storage Growth**:
- Monitor storage usage over time
- Predict when node will need expansion
- Track capacity planning

**Bandwidth Usage**:
- Incoming and outgoing data rates
- Peak usage times
- Network contribution metrics

### Health Score Breakdown

The health score (0-100) is calculated from:

1. **Uptime (35%)**:
   - 100% uptime = 35 points
   - 95%+ uptime = 30-35 points
   - 90-95% uptime = 25-30 points
   - <90% uptime = <25 points

2. **Success Rate (30%)**:
   - 100% success = 30 points
   - 99%+ success = 28-30 points
   - 95-99% success = 25-28 points
   - <95% success = <25 points

3. **Latency (20%)**:
   - <50ms = 20 points
   - 50-100ms = 15-20 points
   - 100-200ms = 10-15 points
   - >200ms = <10 points

4. **Storage Efficiency (15%)**:
   - 50-80% used = 15 points (optimal)
   - 40-50% or 80-90% used = 10-15 points
   - <40% or >90% used = <10 points

**Score Ranges**:
- **90-100**: Excellent (Green badge)
- **80-89**: Good (Light green badge)
- **70-79**: Fair (Yellow badge)
- **60-69**: Poor (Orange badge)
- **<60**: Critical (Red badge)

## Search & Filters

### Search Functionality

Located at the top of the Node List page.

**Search by**:
- **Moniker**: Node name (e.g., "xandeum-node-1")
- **Public Key**: Full or partial key
- **Location**: Country or city name
- **IP Address**: Node's public IP

**Search Tips**:
- Case-insensitive
- Partial matches supported
- Real-time filtering as you type
- Clear search with "X" button

### Filter Options

#### By Status
- All Nodes (default)
- Active Only
- Syncing Only
- Inactive Only

#### By Location
- All Locations
- By Continent
- By Country
- By Region

#### By Performance
- High Health Score (90+)
- Medium Health Score (70-89)
- Low Health Score (<70)

### Sort Options

Click column headers to sort by:
- **Health Score**: Highest to lowest (default)
- **Uptime**: Best to worst
- **Storage**: Most to least capacity
- **Latency**: Fastest to slowest
- **Moniker**: Alphabetical (A-Z)

## Understanding Metrics

### Uptime

**What it is**: Percentage of time the node is online and responsive.

**How it's calculated**:
```
Uptime = (Time Online / Total Time) × 100
```

**What good uptime looks like**:
- **99%+**: Exceptional (less than 7 hours downtime per month)
- **95-99%**: Very good (1-2 days downtime per month)
- **90-95%**: Good (2-3 days downtime per month)
- **<90%**: Needs improvement (>3 days downtime per month)

**Why it matters**: Higher uptime means more reliable storage and better network participation.

### Latency

**What it is**: Average time for the node to respond to requests, measured in milliseconds (ms).

**How it's measured**:
- HTTP ping to node endpoint
- Averaged over last 100 requests
- Updated every 30 seconds

**Latency ranges**:
- **<50ms**: Excellent (local/nearby node)
- **50-100ms**: Very good (regional node)
- **100-200ms**: Good (distant node)
- **200-500ms**: Fair (international node)
- **>500ms**: Poor (very distant or overloaded node)

**Factors affecting latency**:
- Geographic distance
- Network congestion
- Node load
- ISP routing

### Storage Capacity

**What it shows**:
- **Total**: Maximum storage the node can provide
- **Used**: Currently allocated storage
- **Available**: Free storage remaining

**Storage efficiency**:
- **Optimal**: 50-80% used (room to grow, actively used)
- **Underutilized**: <40% used (wasted capacity)
- **Overutilized**: >90% used (may need expansion)

**Storage growth rate**:
- Track how quickly storage fills up
- Predict when node needs expansion
- Plan capacity upgrades

### Bandwidth

**What it measures**: Data transfer rate in megabits per second (Mbps).

**Bandwidth types**:
- **Ingress**: Data coming into the node (uploads from clients)
- **Egress**: Data leaving the node (downloads to clients)
- **Total**: Combined ingress + egress

**Typical bandwidth ranges**:
- **100+ Mbps**: High-traffic node (CDN-like usage)
- **10-100 Mbps**: Medium traffic (normal operations)
- **1-10 Mbps**: Low traffic (new or idle node)
- **<1 Mbps**: Very low traffic (inactive or testing)

### Success Rate

**What it is**: Percentage of successful operations vs. total operations.

**Operations tracked**:
- Storage reads
- Storage writes
- Peer connections
- Gossip messages
- Health checks

**Success rate ranges**:
- **99%+**: Excellent (very reliable)
- **95-99%**: Good (occasional failures)
- **90-95%**: Fair (frequent failures)
- **<90%**: Poor (unreliable node)

**Common causes of failures**:
- Network interruptions
- Node software bugs
- Resource exhaustion (CPU, RAM, disk)
- Malformed requests

## Data Export

### Exporting Node Data

From any node detail page:

1. Click "Export" button in the top right
2. Choose format:
   - **CSV**: Spreadsheet-friendly (Excel, Google Sheets)
   - **JSON**: Developer-friendly (APIs, scripts)
3. Data downloads automatically

**CSV Export Includes**:
- Node identifier (public key, moniker)
- Current metrics (uptime, latency, storage, bandwidth)
- Historical data (last 30 days)
- Health score breakdown

**JSON Export Structure**:
```json
{
  "node": {
    "publicKey": "...",
    "moniker": "...",
    "location": {...},
    "metrics": {...},
    "history": [...]
  }
}
```

### Exporting Network Data

From the dashboard:

1. Click "Export Network Stats" button
2. Choose format (CSV/JSON)
3. Data includes:
   - All node summaries
   - Network-wide statistics
   - Decentralization metrics
   - Timestamp of export

**Use Cases**:
- Offline analysis
- Custom dashboards
- Research and reports
- Automated monitoring scripts

## FAQ

### General Questions

**Q: What is a pNode?**
A: A pNode (Provider Node) is a storage provider node in the Xandeum network. These nodes provide decentralized storage capacity for Solana dApps.

**Q: How often is data updated?**
A: XandScan updates data every 30 seconds by default. You can see the "Last updated" timestamp at the top of each page.

**Q: Is XandScan official?**
A: XandScan is an independent analytics platform created for the Xandeum pNode Analytics Bounty. It uses official pRPC (pNode RPC) APIs.

**Q: Do I need to connect a wallet?**
A: No! XandScan is read-only and requires no authentication or wallet connection.

### Technical Questions

**Q: Where does the data come from?**
A: XandScan queries the Xandeum gossip network via pRPC endpoints. These are the same APIs that pNodes use to communicate.

**Q: What are the pRPC endpoints?**
A: By default, XandScan uses 9 hardcoded pNode endpoints for redundancy. If you're self-hosting, you can configure custom endpoints via environment variables.

**Q: Why do some nodes show "Unknown" status?**
A: This occurs when a node is unreachable or not responding to pRPC calls. It could be offline, firewalled, or temporarily unavailable.

**Q: How is the health score calculated?**
A: Health score is a weighted composite of uptime (35%), success rate (30%), latency (20%), and storage efficiency (15%). See [Health Score Breakdown](#health-score-breakdown) for details.

**Q: Can I run my own instance?**
A: Yes! XandScan is open source. See [README.md](../README.md) and deployment guides for instructions.

### Data Questions

**Q: How far back does historical data go?**
A: Currently, XandScan shows up to 90 days of historical data. This may increase in future versions.

**Q: Can I access historical data via API?**
A: XandScan is currently a UI-only platform. API access may be added in future versions. You can export data as CSV/JSON for now.

**Q: Why do uptime percentages fluctuate?**
A: Uptime is calculated over a rolling time window. Short-term outages will have more impact on 24-hour uptime than 30-day uptime.

**Q: What's the difference between "Syncing" and "Active"?**
A: "Active" nodes are fully synced and participating normally. "Syncing" nodes are catching up after being offline or newly joining the network.

### Troubleshooting

**Q: XandScan shows "Loading..." forever**
A: This usually means pRPC endpoints are unreachable. Check your internet connection and try refreshing. If the issue persists, the Xandeum network may be experiencing issues.

**Q: Node data looks incorrect**
A: Data is pulled directly from pRPC. If a node reports incorrect metrics, it's an issue with the node itself, not XandScan. You can verify by querying the pRPC endpoint directly.

**Q: Can't find a specific node**
A: Nodes only appear in XandScan if they're actively participating in gossip. If a node is offline or not gossiping, it won't be visible.

**Q: Export button doesn't work**
A: Ensure JavaScript is enabled and your browser supports downloads. Try a different browser if the issue persists.

**Q: Charts aren't displaying**
A: This requires JavaScript and a modern browser. Try clearing your cache and refreshing. Ensure you're using a supported browser (Chrome, Firefox, Safari, Edge).

### For Node Operators

**Q: How can I improve my node's health score?**
A:
1. **Maximize uptime**: Use reliable hardware and internet
2. **Reduce latency**: Use a good datacenter with low latency
3. **Optimize storage**: Aim for 50-80% utilization
4. **Monitor errors**: Fix issues causing failed operations

**Q: My node isn't showing up in XandScan**
A: Ensure your node is:
- Running and synced
- Properly configured to participate in gossip
- Not firewalled (pRPC port accessible)
- Using a recent version of Xandeum software

**Q: Can I customize my node's moniker?**
A: Yes, but this is configured in your pNode software, not in XandScan. Check the Xandeum documentation for how to set a custom moniker.

**Q: Does XandScan affect my node's performance?**
A: No. XandScan only makes read-only API calls. There's no performance impact on your node.

### Feature Requests

**Q: Can you add [feature X]?**
A: Feature requests are welcome! Please open an issue on the GitHub repository or join the Xandeum Discord to discuss.

**Q: Will XandScan support mobile apps?**
A: The web interface is fully mobile-responsive. Native mobile apps may be considered for future development.

**Q: Can I embed XandScan widgets on my site?**
A: Widget/embed functionality is not currently available but is on the roadmap for future versions.

**Q: Will XandScan add alerts/notifications?**
A: Alert functionality (e.g., "notify me when uptime drops below 95%") is planned for a future release.

## Support & Community

### Getting Help

- **Documentation**: Check other docs in [docs/](.)
- **GitHub Issues**: Report bugs or request features
- **Discord**: Join the [Xandeum Discord](https://discord.gg/uqRSmmM5m)
- **Website**: Visit [xandeum.network](https://xandeum.network)

### Contributing

XandScan is open source! Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines (if available).

### Stay Updated

- **GitHub**: Watch the repository for updates
- **Discord**: Join for announcements and discussions
- **Twitter/X**: Follow @Xandeum for network updates

## Glossary

**pNode**: Provider Node - a storage provider in the Xandeum network

**pRPC**: pNode RPC - the API protocol for communicating with pNodes

**Gossip**: Peer-to-peer network communication protocol

**Moniker**: Human-readable name for a node

**Health Score**: Composite metric measuring node performance (0-100)

**Uptime**: Percentage of time a node is online and responsive

**Latency**: Time delay in network communication (in milliseconds)

**Storage Capacity**: Amount of data a node can store

**Bandwidth**: Data transfer rate (in Mbps or Gbps)

**Success Rate**: Percentage of successful operations

**Decentralization Score**: Measure of geographic distribution

**Syncing**: Process of catching up with the network state

**Public Key**: Unique cryptographic identifier for a node

**Endpoint**: Network address where a node can be reached

---

**XandScan Version**: 1.0.0
**Last Updated**: December 2024
**Platform**: Xandeum pNode Analytics

For technical documentation, see:
- [API Documentation](./API.md)
- [pRPC Integration Guide](./PRPC_INTEGRATION_COMPLETE.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Railway Deployment Guide](./RAILWAY_DEPLOYMENT.md)
