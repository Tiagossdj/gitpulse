"use client";

import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import { GridBackground } from "@/components/GridBackground";
import { RepoDashboard } from "@/components/RepoDashboard";
import { SearchBar } from "@/components/SearchBar";
import { ApiError } from "@/lib/api";
import { useRepoHealth } from "@/lib/hooks/useRepoHealth";
import { parseRepoInput } from "@/lib/parse-repo-input";
import { Activity, AlertTriangle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState<{ owner: string; name: string } | null>(
    null,
  );
  const [parseError, setParseError] = useState<string | null>(null);

  const { data, isFetching, error } = useRepoHealth(
    query?.owner ?? null,
    query?.name ?? null,
  );
  const showSkeleton = Boolean(query) && isFetching && !data;

  function handleSearch() {
    setParseError(null);
    const parsed = parseRepoInput(input);
    if (!parsed) {
      setQuery(null);
      setParseError("Use o formato owner/repo ou uma URL do GitHub.");
      return;
    }
    setQuery(parsed);
  }

  const apiErr = error instanceof ApiError ? error : null;
  const repo = data?.data ?? null;
  const isCached = Boolean(data?.cacheHit);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <GridBackground />

      <div className="relative z-10">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-border/50 bg-background/50 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-linear-to-br from-primary/20 to-accent/20 p-2.5">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl tracking-tight">GitPulse</h1>
                <p className="mono text-sm text-muted-foreground">
                  Repository Health Observatory
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="px-6 py-12">
          <AnimatePresence mode="wait">
            {!repo && !showSkeleton && !apiErr && !parseError ? (
              <motion.div
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex min-h-[60vh] flex-col items-center justify-center"
              >
                <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5" />
                <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5" />
                <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10 mb-12 space-y-4 text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm backdrop-blur-sm"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="mono text-primary">
                      Real-time Analysis
                    </span>
                  </motion.div>

                  <h2 className="text-4xl tracking-tight leading-tight sm:text-5xl lg:text-6xl">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="block"
                    >
                      Monitor Repository
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="gradient-text mt-2 block"
                    >
                      Health in Real-Time
                    </motion.span>
                  </h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground"
                  >
                    Analise repositórios GitHub instantaneamente. Veja estrelas,
                    forks, pull requests, issues e contribuidores — com cache
                    via Redis quando disponível.
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative z-10 flex w-full justify-center"
                >
                  <SearchBar
                    value={input}
                    onChange={setInput}
                    onSubmit={handleSearch}
                    disabled={Boolean(query) && isFetching}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mono relative z-10 mt-12 text-center px-4 text-sm text-muted-foreground"
                >
                  <span className="opacity-60 block mb-1 sm:inline sm:mb-0">
                    Try:
                  </span>
                  <span className="inline-block">
                    facebook/react · vercel/next.js · microsoft/vscode
                  </span>
                </motion.div>
              </motion.div>
            ) : null}

            {parseError ? (
              <motion.div
                key="parse-error"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="mx-auto max-w-7xl"
              >
                <div className="mb-8 flex justify-center">
                  <SearchBar
                    value={input}
                    onChange={setInput}
                    onSubmit={handleSearch}
                    disabled={Boolean(query) && isFetching}
                  />
                </div>
                <p className="text-center text-sm text-amber-400">
                  {parseError}
                </p>
              </motion.div>
            ) : null}

            {showSkeleton ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12"
              >
                <div className="mx-auto mb-8 max-w-7xl">
                  <div className="flex justify-center">
                    <SearchBar
                      value={input}
                      onChange={setInput}
                      onSubmit={handleSearch}
                      disabled={Boolean(query) && isFetching}
                    />
                  </div>
                </div>
                <DashboardSkeleton />
              </motion.div>
            ) : null}

            {repo && !showSkeleton ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mx-auto mb-8 max-w-7xl">
                  <div className="flex justify-center">
                    <SearchBar
                      value={input}
                      onChange={setInput}
                      onSubmit={handleSearch}
                      disabled={Boolean(query) && isFetching}
                    />
                  </div>
                </div>
                <RepoDashboard
                  repo={repo}
                  cacheHit={isCached}
                  cacheTtl={data?.cacheTtl ?? null}
                />
              </motion.div>
            ) : null}

            {apiErr ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex min-h-[40vh] flex-col items-center justify-center"
              >
                <div className="max-w-md space-y-4 text-center">
                  <div className="inline-flex rounded-2xl bg-destructive/10 p-4">
                    <AlertTriangle className="h-12 w-12 text-destructive" />
                  </div>
                  <h3 className="text-xl">Something went wrong</h3>
                  <p className="text-muted-foreground">
                    {apiErr.status === 404
                      ? "Repositório não encontrado."
                      : apiErr.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuery(null)}
                    className="rounded-xl bg-primary px-6 py-3 text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative border-t border-border/50 bg-background/50 backdrop-blur-xl md:fixed md:bottom-0 md:left-0 md:right-0"
        >
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-4">
            <div className="flex flex-col items-center justify-center gap-y-4 text-sm text-muted-foreground md:flex-row md:justify-between md:gap-y-0">
              <p className="mono text-center md:text-left">
                Powered by GitHub API + Redis Cache
              </p>

              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  System Online
                </span>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
