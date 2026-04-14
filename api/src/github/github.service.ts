import { redis } from "../cache/redis.js";
import { getEnv } from "../config/env.js";
import type { GitHubRepository } from "./github.repository.js";
import type { RepoHealth } from "./github.types.js";

export type RepoHealthResult = {
  data: RepoHealth;
  cache: { hit: boolean; ttl: number };
};

export function createGitHubService(deps: { github: GitHubRepository }) {
  return {
    async getRepoHealth(
      owner: string,
      name: string,
    ): Promise<RepoHealthResult> {
      const { CACHE_TTL } = getEnv();
      const key = `repo:${owner}:${name}`;

      try {
        const cached = await redis().get(key);
        if (cached) {
          const ttl = await redis().ttl(key);
          const data = JSON.parse(cached) as RepoHealth;
          return { data, cache: { hit: true, ttl } };
        }
      } catch {
        // Cache is best-effort. If Redis is unavailable, continue without cache.
      }

      const data = await deps.github.getRepoHealth(owner, name);
      try {
        await redis().set(key, JSON.stringify(data), "EX", CACHE_TTL);
      } catch {
        // ignore cache write failures
      }

      return { data, cache: { hit: false, ttl: CACHE_TTL } };
    },

    async invalidateRepoCache(owner: string, name: string) {
      const key = `repo:${owner}:${name}`;
      try {
        await redis().del(key);
      } catch {
        // ignore cache delete failures
      }
    },
  };
}
