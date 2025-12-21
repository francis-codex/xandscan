'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="cursor-pointer">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                XandScan
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 sm:mt-1 hidden xs:block">
                Xandeum pNode Network Explorer
              </p>
            </div>
          </Link>
          <nav className="flex gap-1 sm:gap-2">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-foreground hover:text-primary text-xs sm:text-sm px-2 sm:px-4",
                  isActive('/') && !pathname.includes('/nodes') && !pathname.includes('/docs') && "bg-muted"
                )}
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/nodes">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-foreground hover:text-primary text-xs sm:text-sm px-2 sm:px-4",
                  isActive('/nodes') && "bg-muted"
                )}
              >
                Nodes
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-foreground hover:text-primary text-xs sm:text-sm px-2 sm:px-4",
                  isActive('/docs') && "bg-muted"
                )}
              >
                Docs
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
