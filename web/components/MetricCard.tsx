"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  delay?: number;
  color?: "cyan" | "purple" | "blue" | "green" | "orange";
};

const colorClasses: Record<NonNullable<Props["color"]>, string> = {
  cyan: "from-cyan-500/20 to-cyan-600/20 text-cyan-400 shadow-cyan-500/30",
  purple:
    "from-purple-500/20 to-purple-600/20 text-purple-400 shadow-purple-500/30",
  blue: "from-blue-500/20 to-blue-600/20 text-blue-400 shadow-blue-500/30",
  green: "from-green-500/20 to-green-600/20 text-green-400 shadow-green-500/30",
  orange:
    "from-orange-500/20 to-orange-600/20 text-orange-400 shadow-orange-500/30",
};

export function MetricCard({
  label,
  value,
  icon: Icon,
  delay = 0,
  color = "cyan",
}: Props) {
  const classes = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="group relative"
    >
      <div
        className={`absolute inset-0 rounded-xl bg-linear-to-br ${classes} blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative rounded-xl border border-border bg-card p-6 transition-all hover:border-border/50">
        <div className="mb-4 flex items-start justify-between">
          <div className={`rounded-lg bg-linear-to-br p-3 ${classes}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="mono text-sm tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          <p className="mono text-3xl tracking-tight">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
