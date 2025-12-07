'use client';

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatBytes } from "@/lib/utils";
import { format } from "date-fns";
import type { HistoricalMetric } from "@/types/pnode";

interface PerformanceChartProps {
  title: string;
  data: HistoricalMetric[];
  dataKey: string;
  color?: string;
  unit?: string;
  formatValue?: (value: number) => string;
}

export function PerformanceChart({
  title,
  data,
  dataKey,
  color = '#3b82f6',
  unit = '',
  formatValue,
}: PerformanceChartProps) {
  const chartData = data.map(item => ({
    timestamp: new Date(item.timestamp).getTime(),
    value: item.value,
  }));

  const defaultFormatValue = (value: number) => {
    if (formatValue) return formatValue(value);
    if (unit === 'bytes') return formatBytes(value);
    if (unit === 'ms') return `${value.toFixed(0)}ms`;
    if (unit === '%') return `${value.toFixed(1)}%`;
    return value.toFixed(2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM dd HH:mm')}
              className="text-xs"
              stroke="currentColor"
            />
            <YAxis
              tickFormatter={defaultFormatValue}
              className="text-xs"
              stroke="currentColor"
            />
            <Tooltip
              labelFormatter={(timestamp) => format(new Date(timestamp), 'PPpp')}
              formatter={(value: number) => [defaultFormatValue(value), dataKey]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              name={dataKey}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
