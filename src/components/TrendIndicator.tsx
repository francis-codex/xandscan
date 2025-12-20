'use client';

import { memo } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TrendIndicatorProps {
  value: number;
  previousValue?: number;
  suffix?: string;
  showPercentage?: boolean;
}

export const TrendIndicator = memo(function TrendIndicator({
  value,
  previousValue,
  suffix = '',
  showPercentage = true,
}: TrendIndicatorProps) {
  if (previousValue === undefined || previousValue === 0) {
    return null;
  }

  const change = value - previousValue;
  const percentChange = (change / previousValue) * 100;
  const isPositive = change > 0;
  const isNeutral = Math.abs(percentChange) < 0.1;

  if (isNeutral) {
    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Minus className="h-3 w-3" />
        <span>No change</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 text-xs ${
      isPositive ? 'text-green-500' : 'text-red-500'
    }`}>
      {isPositive ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      <span>
        {isPositive ? '+' : ''}{showPercentage ? percentChange.toFixed(1) + '%' : change.toFixed(1)}{suffix}
      </span>
    </div>
  );
});
