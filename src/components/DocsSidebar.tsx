'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  FileText,
  Code2,
  Rocket,
  Server,
  Users,
  Database,
  GitBranch
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", icon: BookOpen },
      { title: "Quick Start", href: "/docs/guides/quick-start", icon: Rocket },
    ],
  },
  {
    title: "User Guides",
    items: [
      { title: "Platform Guide", href: "/docs/guides/platform-guide", icon: Users },
      { title: "Understanding Metrics", href: "/docs/guides/metrics", icon: Database },
    ],
  },
  {
    title: "Platform",
    items: [
      { title: "Deployment", href: "/docs/platform/deployment", icon: Server },
      { title: "Architecture", href: "/docs/platform/architecture", icon: GitBranch },
    ],
  },
  {
    title: "API & Integration",
    items: [
      { title: "API Reference", href: "/docs/api/reference", icon: Code2 },
      { title: "Integration Guide", href: "/docs/api/integration", icon: FileText },
    ],
  },
];

interface DocsSidebarProps {
  onNavigate?: () => void;
}

export function DocsSidebar({ onNavigate }: DocsSidebarProps = {}) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card/50 lg:bg-card/50 bg-card h-[calc(100vh-8.5rem)] lg:h-[calc(100vh-4rem)] overflow-y-auto shadow-lg lg:shadow-none">
      <nav className="p-4 sm:p-6 space-y-6 sm:space-y-8">
        {navigation.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
