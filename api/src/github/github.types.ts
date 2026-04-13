export type PR = {
  id: number
  title: string
  url: string
  author: string
  createdAt: string
}

export type Issue = {
  id: number
  title: string
  url: string
  author: string
  createdAt: string
  updatedAt: string
}

export type Contributor = {
  login: string
  contributions: number
  url: string
}

export interface RepoHealth {
  owner: string
  name: string
  description: string | null
  stars: number
  forks: number
  language: string | null
  openIssuesCount: number
  openPRs: PR[]
  staleIssues: Issue[]
  topContributors: Contributor[]
  cachedAt: string
}

