import { getEnv } from "../config/env.js"
import { redis } from "../cache/redis.js"
import type { RepoHealth } from "./github.types.js"
import type { GitHubRepository } from "./github.repository.js"

export type RepoHealthResult = {
  data: RepoHealth
  cache: { hit: boolean; ttl: number }
}

export function createGitHubService(deps: { github: GitHubRepository }) {
  return {
    async getRepoHealth(owner: string, name: string): Promise<RepoHealthResult> {
      const { CACHE_TTL } = getEnv()
      const key = `repo:${owner}:${name}`

      const cached = await redis().get(key)
      if (cached) {
        const ttl = await redis().ttl(key)
        const data = JSON.parse(cached) as RepoHealth
        return { data, cache: { hit: true, ttl } }
      }

      const data = await deps.github.getRepoHealth(owner, name)
      await redis().set(key, JSON.stringify(data), "EX", CACHE_TTL)

      return { data, cache: { hit: false, ttl: CACHE_TTL } }
    }
  }
}

