import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format bytes to human-readable format
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format percentage with specified decimal places
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format number with comma separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Calculate health score based on multiple metrics
 */
export function calculateHealthScore(
  uptime: number,
  successRate: number,
  latency: number,
  storageUsage: number
): number {
  // Weight factors
  const uptimeWeight = 0.4;
  const successRateWeight = 0.3;
  const latencyWeight = 0.2;
  const storageWeight = 0.1;

  // Normalize latency (lower is better, assume 100ms is excellent, 1000ms is poor)
  const latencyScore = Math.max(0, 100 - (latency / 10));

  // Storage usage score (neither too low nor too high is ideal, 70-80% is optimal)
  const optimalStorage = 75;
  const storageScore = 100 - Math.abs(storageUsage - optimalStorage);

  const score =
    uptime * uptimeWeight +
    successRate * successRateWeight +
    latencyScore * latencyWeight +
    storageScore * storageWeight;

  return Math.min(100, Math.max(0, score));
}

/**
 * Get status color based on health score
 */
export function getStatusColor(score: number): string {
  if (score >= 90) return 'text-green-500';
  if (score >= 70) return 'text-yellow-500';
  if (score >= 50) return 'text-orange-500';
  return 'text-red-500';
}

/**
 * Get status badge color
 */
export function getStatusBadgeColor(status: 'active' | 'inactive' | 'syncing'): string {
  switch (status) {
    case 'active':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'syncing':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'inactive':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
}

/**
 * Format time ago (e.g., "2 hours ago")
 */
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
}

/**
 * Truncate public key for display
 */
export function truncatePublicKey(key: string, length: number = 8): string {
  if (key.length <= length * 2) return key;
  return `${key.slice(0, length)}...${key.slice(-length)}`;
}

/**
 * Calculate decentralization score based on geographic distribution
 */
export function calculateDecentralizationScore(
  nodes: Array<{ country: string; lat: number; lng: number }>
): number {
  if (nodes.length === 0) return 0;

  // Count unique countries
  const uniqueCountries = new Set(nodes.map(n => n.country)).size;
  const countryDiversity = (uniqueCountries / nodes.length) * 100;

  // Calculate geographic spread (simplified)
  const avgLat = nodes.reduce((sum, n) => sum + n.lat, 0) / nodes.length;
  const avgLng = nodes.reduce((sum, n) => sum + n.lng, 0) / nodes.length;

  const spread = nodes.reduce((sum, n) => {
    const latDiff = n.lat - avgLat;
    const lngDiff = n.lng - avgLng;
    return sum + Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
  }, 0) / nodes.length;

  const spreadScore = Math.min(100, spread * 2);

  // Combine scores
  return (countryDiversity * 0.6 + spreadScore * 0.4);
}

/**
 * Sort array by field
 */
export function sortBy<T>(
  array: T[],
  field: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}
