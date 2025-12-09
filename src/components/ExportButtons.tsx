'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Download,
  FileJson,
  FileSpreadsheet,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import {
  exportNodesToCSV,
  exportNetworkToJSON,
  exportNetworkSummary,
  exportNodeComparison,
  generateStatusText,
  copyToClipboard,
} from "@/lib/export";
import type { PNode, NetworkStats } from "@/types/pnode";

interface ExportButtonsProps {
  nodes: PNode[];
  stats: NetworkStats;
  variant?: 'default' | 'compact';
}

export function ExportButtons({ nodes, stats, variant = 'default' }: ExportButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [exportingCSV, setExportingCSV] = useState(false);
  const [exportingJSON, setExportingJSON] = useState(false);

  const handleCopyStatus = async () => {
    const statusText = generateStatusText(stats);
    await copyToClipboard(statusText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    setExportingCSV(true);
    setTimeout(() => {
      exportNodesToCSV(nodes);
      setExportingCSV(false);
    }, 300);
  };

  const handleExportJSON = () => {
    setExportingJSON(true);
    setTimeout(() => {
      exportNetworkToJSON({ nodes, stats });
      setExportingJSON(false);
    }, 300);
  };

  const handleExportSummary = () => {
    exportNetworkSummary(stats, nodes);
  };

  const handleExportComparison = () => {
    exportNodeComparison(nodes);
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          disabled={exportingCSV}
          className="gap-2"
        >
          <FileSpreadsheet className="h-4 w-4" />
          CSV
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportJSON}
          disabled={exportingJSON}
          className="gap-2"
        >
          <FileJson className="h-4 w-4" />
          JSON
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Export Data
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Download network data for external analysis
          </p>
        </div>
        <Badge variant="outline">
          {nodes.length} node{nodes.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* CSV Export */}
        <Button
          variant="outline"
          onClick={handleExportCSV}
          disabled={exportingCSV}
          className="justify-start h-auto py-4 px-4"
        >
          <div className="flex items-start gap-3 w-full">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FileSpreadsheet className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm">Export to CSV</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {exportingCSV ? 'Generating...' : 'Spreadsheet format for Excel/Sheets'}
              </div>
            </div>
            <Download className="h-4 w-4 opacity-50" />
          </div>
        </Button>

        {/* JSON Export */}
        <Button
          variant="outline"
          onClick={handleExportJSON}
          disabled={exportingJSON}
          className="justify-start h-auto py-4 px-4"
        >
          <div className="flex items-start gap-3 w-full">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileJson className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm">Export to JSON</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {exportingJSON ? 'Generating...' : 'Complete data for API integrations'}
              </div>
            </div>
            <Download className="h-4 w-4 opacity-50" />
          </div>
        </Button>

        {/* Summary Report */}
        <Button
          variant="outline"
          onClick={handleExportSummary}
          className="justify-start h-auto py-4 px-4"
        >
          <div className="flex items-start gap-3 w-full">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm">Network Summary</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Aggregate statistics report
              </div>
            </div>
            <Download className="h-4 w-4 opacity-50" />
          </div>
        </Button>

        {/* Node Comparison */}
        <Button
          variant="outline"
          onClick={handleExportComparison}
          className="justify-start h-auto py-4 px-4"
        >
          <div className="flex items-start gap-3 w-full">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <FileSpreadsheet className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm">Node Comparison</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Side-by-side performance metrics
              </div>
            </div>
            <Download className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </div>

      {/* Quick Copy Status */}
      <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          onClick={handleCopyStatus}
          className="w-full justify-start gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-green-500">Copied to clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy Network Status (Quick Share)</span>
            </>
          )}
        </Button>
      </div>

      {/* Info */}
      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-900 dark:text-blue-100">
          <strong>Data Privacy:</strong> All exports are generated locally in your browser.
          No data is sent to external servers.
        </p>
      </div>
    </div>
  );
}
