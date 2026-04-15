import type { RepoHealth } from "@/lib/github.types";
import { Calendar, Code, GitFork, MessageSquare, Star } from "lucide-react";
import { motion } from "motion/react";
import { ContributorsList } from "./ContributorsList";
import { IssuesList } from "./IssuesList";
import { MetricCard } from "./MetricCard";
import { PullRequestsList } from "./PullRequestsList";

type Props = {
  repo: RepoHealth;
  cacheHit: boolean;
  cacheTtl: number | null;
};

export function RepoDashboard({ repo, cacheHit }: Props) {
  const cacheDate = new Date(repo.cachedAt);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative space-y-4"
      >
        <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="group inline-block max-w-full">
              <h2 className="relative mb-2 inline-block text-2xl sm:text-4xl tracking-tight break-all sm:break-normal">
                <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                  {repo.owner}
                </span>
                <span className="mx-2 text-primary">/</span>
                <span className="gradient-text">{repo.name}</span>
                <div className="absolute -bottom-1 left-0 right-0 h-px origin-center scale-x-0 bg-linear-to-r from-primary/0 via-primary/50 to-primary/0 transition-transform duration-500 group-hover:scale-x-100" />
              </h2>
            </div>

            {repo.description ? (
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                {repo.description}
              </p>
            ) : null}
          </div>

          {cacheHit ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="self-start group relative flex shrink-0 items-center gap-2 overflow-hidden rounded-xl border border-primary/20 bg-primary/10 px-4 py-2.5 text-sm backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Calendar className="shrink-0 h-4 w-4 text-primary" />
              <div className="relative z-10">
                <p className="mono text-xs text-muted-foreground">CACHED</p>
                <p className="mono text-xs text-primary">
                  {cacheDate.toLocaleTimeString("pt-BR")}
                </p>
              </div>
            </motion.div>
          ) : null}
        </div>

        {repo.language ? (
          <div className="flex items-center gap-2 text-sm">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-accent/30 blur-sm" />
              <div className="relative h-3 w-3 rounded-full bg-accent" />
            </div>
            <span className="mono text-muted-foreground">{repo.language}</span>
          </div>
        ) : null}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Stars"
          value={repo.stars}
          icon={Star}
          delay={0}
          color="cyan"
        />
        <MetricCard
          label="Forks"
          value={repo.forks}
          icon={GitFork}
          delay={0.1}
          color="purple"
        />
        <MetricCard
          label="Open Issues"
          value={repo.openIssuesCount}
          icon={MessageSquare}
          delay={0.15}
          color="orange"
        />
        <MetricCard
          label="Language"
          value={repo.language ?? "N/A"}
          icon={Code}
          delay={0.2}
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PullRequestsList pullRequests={repo.openPRs.slice(0, 5)} />
        <IssuesList issues={repo.staleIssues.slice(0, 5)} />
        <ContributorsList contributors={repo.topContributors.slice(0, 5)} />
      </div>
    </div>
  );
}
