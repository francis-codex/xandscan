'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Package, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react";
import { getVersionDistribution, getMostCommonVersion } from "@/lib/intelligence";
import type { PNode } from "@/types/pnode";

interface VersionDistributionProps {
  nodes: PNode[];
}

export function VersionDistribution({ nodes }: VersionDistributionProps) {
  const distribution = getVersionDistribution(nodes);
  const latestVersion = getMostCommonVersion(nodes);

  const chartData = distribution.map(item => ({
    version: item.version,
    count: item.count,
    percentage: item.percentage,
    isLatest: item.isLatest,
  }));

  const outdatedNodes = nodes.filter(n => n.version !== latestVersion);
  const versionHealthPercent = ((nodes.length - outdatedNodes.length) / nodes.length) * 100;

  const getHealthColor = () => {
    if (versionHealthPercent === 100) return 'text-green-500';
    if (versionHealthPercent >= 80) return 'text-blue-500';
    if (versionHealthPercent >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getHealthStatus = () => {
    if (versionHealthPercent === 100) return 'Perfect';
    if (versionHealthPercent >= 80) return 'Good';
    if (versionHealthPercent >= 60) return 'Fair';
    return 'Poor';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-purple-500" />
            <CardTitle>Version Distribution</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {versionHealthPercent === 100 ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : outdatedNodes.length > 0 && (
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            )}
            <Badge variant={versionHealthPercent >= 80 ? 'default' : 'secondary'}>
              {getHealthStatus()}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Track pNode software versions across the network
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Version Health Summary */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-50">
                  Version Health
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nodes on latest version ({latestVersion})
                </p>
              </div>
              <div className={`text-4xl font-bold ${getHealthColor()}`}>
                {versionHealthPercent.toFixed(0)}%
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${versionHealthPercent}%` }}
              />
            </div>
            {outdatedNodes.length > 0 && (
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {outdatedNodes.length} node{outdatedNodes.length !== 1 ? 's' : ''} need{outdatedNodes.length === 1 ? 's' : ''} upgrade
              </p>
            )}
          </div>

          {/* Bar Chart */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-gray-900 dark:text-gray-50">
              Version Breakdown:
            </h4>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                <XAxis
                  dataKey="version"
                  className="text-xs"
                  stroke="currentColor"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  className="text-xs"
                  stroke="currentColor"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border shadow-lg">
                          <p className="font-semibold text-gray-900 dark:text-gray-50">
                            {data.version}
                            {data.isLatest && (
                              <Badge variant="default" className="ml-2 text-xs">
                                Latest
                              </Badge>
                            )}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {data.count} node{data.count !== 1 ? 's' : ''}
                          </p>
                          <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                            {data.percentage.toFixed(1)}% of network
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isLatest ? '#10b981' : entry.percentage < 10 ? '#ef4444' : '#6366f1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Version List */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-50">
              All Versions:
            </h4>
            {distribution.map(({ version, count, percentage, isLatest }) => (
              <div
                key={version}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isLatest ? 'bg-green-500' : percentage < 10 ? 'bg-red-500' : 'bg-indigo-500'
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium">
                        {version}
                      </span>
                      {isLatest && (
                        <Badge variant="default" className="text-xs">
                          Current
                        </Badge>
                      )}
                      {!isLatest && percentage < 10 && (
                        <Badge variant="destructive" className="text-xs">
                          Deprecated
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {count} node{count !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Outdated Nodes Action */}
          {outdatedNodes.length > 0 && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Upgrade Recommended
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    {outdatedNodes.length} pNode{outdatedNodes.length !== 1 ? 's are' : ' is'} running outdated version{outdatedNodes.length !== 1 ? 's' : ''}.
                    Upgrade to {latestVersion} for latest features and security patches.
                  </p>
                </div>
                <Link href="/nodes">
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    View Nodes
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Network Synchronization Status */}
          {versionHealthPercent === 100 ? (
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-green-900 dark:text-green-100">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className="font-semibold">Perfect Network Synchronization</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    All pNodes running {latestVersion}. Network is fully compatible and synchronized.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
