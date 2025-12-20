'use client';

import { Badge } from "./ui/badge";
import { Package, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { calculateVersionHealth } from "@/lib/intelligence";
import type { PNode } from "@/types/pnode";

interface VersionHealthBadgeProps {
  nodes: PNode[];
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function VersionHealthBadge({ nodes, showIcon = true, size = 'md' }: VersionHealthBadgeProps) {
  const { percentage, outdatedCount } = calculateVersionHealth(nodes);

  const getIcon = () => {
    if (percentage === 100) return <CheckCircle className="h-4 w-4" />;
    if (percentage >= 80) return <Package className="h-4 w-4" />;
    if (percentage >= 60) return <AlertTriangle className="h-4 w-4" />;
    return <XCircle className="h-4 w-4" />;
  };

  const getVariant = () => {
    if (percentage === 100) return 'default' as const;
    if (percentage >= 80) return 'secondary' as const;
    if (percentage >= 60) return 'outline' as const;
    return 'destructive' as const;
  };

  const getLabel = () => {
    if (percentage === 100) return 'All on Latest';
    if (percentage >= 80) return 'Good';
    if (percentage >= 60) return 'Fair';
    return 'Poor';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <Badge variant={getVariant()} className={`${sizeClasses[size]} flex items-center gap-1.5`}>
      {showIcon && getIcon()}
      <span className="font-medium">{percentage.toFixed(0)}%</span>
      <span className="opacity-75">{getLabel()}</span>
      {outdatedCount > 0 && (
        <span className="ml-1 opacity-60 text-xs">
          ({outdatedCount} outdated)
        </span>
      )}
    </Badge>
  );
}
