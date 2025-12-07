import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'syncing';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    active: {
      label: 'Active',
      className: 'bg-green-500/10 text-green-500 border-green-500/20',
    },
    inactive: {
      label: 'Inactive',
      className: 'bg-red-500/10 text-red-500 border-red-500/20',
    },
    syncing: {
      label: 'Syncing',
      className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    },
  };

  const variant = variants[status];

  return (
    <Badge
      className={cn('border', variant.className, className)}
      variant="outline"
    >
      <span className="relative flex h-2 w-2 mr-1.5">
        {status === 'active' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            status === 'active' && 'bg-green-500',
            status === 'inactive' && 'bg-red-500',
            status === 'syncing' && 'bg-yellow-500'
          )}
        ></span>
      </span>
      {variant.label}
    </Badge>
  );
}
