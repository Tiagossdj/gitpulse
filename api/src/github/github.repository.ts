import { getEnv } from "../config/env.js"
import type { RepoHealth } from "./github.types.js"

export type GitHubRepository = {
  getRepoHealth(owner: string, name: string): Promise<RepoHealth>
}

export const githubRepository: GitHubRepository = {
  async getRepoHealth(owner, name) {
    const { GITHUB_TOKEN } = getEnv()

    const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
      headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : undefined
    })

    if (!res.ok) {
      const message = await res.text().catch(() => "GitHub request failed")
      throw new Error(message)
    }

    const repo = (await res.json()) as {
      owner: { login: string }
      name: string
      description: string | null
      stargazers_count: number
      forks_count: number
      language: string | null
      open_issues_count: number
    }

    return {
      owner: repo.owner.login,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      openIssuesCount: repo.open_issues_count,
      openPRs: [],
      staleIssues: [],
      topContributors: [],
      cachedAt: new Date().toISOString()
    }
  }
}

