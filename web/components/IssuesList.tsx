"use client";

import type { Issue } from "@/lib/github.types";
import { AlertCircle, Clock } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  issues: Issue[];
};

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo ago`;
}

export function IssuesList({ issues }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-linear-to-br from-orange-500/20 to-orange-600/20 p-2.5">
          <AlertCircle className="h-5 w-5 text-orange-400" />
        </div>
        <h3 className="text-lg">Stale Issues</h3>
        <div className="mono ml-auto rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
          {issues.length} stale
        </div>
      </div>

      <div className="space-y-3">
        {issues.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            No stale issues
          </p>
        ) : (
          issues.map((issue, index) => (
            <motion.a
              key={issue.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.1 }}
              href={issue.url}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-lg border border-border p-4 transition-all hover:border-orange-500/30 hover:bg-secondary/30"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded bg-orange-500/10 p-1.5">
                  <AlertCircle className="h-4 w-4 text-orange-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-1 line-clamp-2 text-sm transition-colors group-hover:text-primary">
                    {issue.title}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="mono">#{issue.id}</span>
                    <span>by {issue.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(issue.updatedAt || issue.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))
        )}
      </div>
    </motion.div>
  );
}
