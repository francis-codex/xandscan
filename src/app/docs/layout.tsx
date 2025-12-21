'use client';

import { Header } from "@/components/Header";
import { DocsSidebar } from "@/components/DocsSidebar";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden sticky top-16 z-40 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          {sidebarOpen ? 'Close' : 'Menu'}
        </Button>
      </div>

      <div className="flex relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden top-[8.5rem]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:sticky top-[8.5rem] lg:top-16 z-40 lg:z-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <DocsSidebar onNavigate={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 w-full lg:max-w-4xl">
          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-sm sm:prose-base">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
