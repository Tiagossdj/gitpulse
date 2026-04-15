import { getEnv } from "../config/env.js";
import { AppError } from "../errors/AppError.js";
import type { RepoHealth } from "./github.types.js";

export type GitHubRepository = {
  getRepoHealth(owner: string, name: string): Promise<RepoHealth>;
};

export const githubRepository: GitHubRepository = {
  async getRepoHealth(owner, name) {
    const { GITHUB_TOKEN } = getEnv();
    const headers = GITHUB_TOKEN
      ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
      : {};

    // Helper para simplificar os fetches internos
    const fetchGH = async (endpoint: string) => {
      const res = await fetch(`https://api.github.com${endpoint}`, {
        headers: headers as Record<string, string>,
      });
      if (!res.ok) {
        if (res.status === 404)
          throw new AppError("Repositório não encontrado", 404);
        if (res.status === 403) throw new AppError("Rate limit atingido", 429);
        throw new AppError("Erro na API do GitHub", 502);
      }
      return res.json();
    };

    // Buscamos tudo em paralelo para não travar a performance
    const [repo, pulls, issues, contributors] = await Promise.all([
      fetchGH(`/repos/${owner}/${name}`),
      fetchGH(
        `/repos/${owner}/${name}/pulls?state=open&sort=created&per_page=5`,
      ),
      fetchGH(`/repos/${owner}/${name}/issues?state=open&per_page=50`), // Pegamos as recentes para filtrar
      fetchGH(`/repos/${owner}/${name}/contributors?per_page=5`),
    ]);

    // Lógica para Stale Issues (abertas há > 48h e sem comentários)
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const staleIssues = issues
      .filter(
        (i: {
          pull_request?: unknown;
          created_at: string;
          comments: number;
        }) => {
          const isNotPR = !i.pull_request;
          const isOld = new Date(i.created_at) < fortyEightHoursAgo;
          const noComments = i.comments === 0;
          return isNotPR && isOld && noComments;
        },
      )
      .slice(0, 5);

    return {
      owner: repo.owner.login,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      openIssuesCount: repo.open_issues_count,

      // Preenchendo os campos que estavam vazios
      openPRs: pulls.map(
        (pr: {
          id: number;
          title: string;
          html_url: string;
          user: { login: string };
          created_at: string;
        }) => ({
          id: pr.id,
          title: pr.title,
          url: pr.html_url,
          author: pr.user.login,
          createdAt: pr.created_at,
        }),
      ),

      staleIssues: staleIssues.map(
        (issue: {
          id: number;
          title: string;
          user: { login: string };
          html_url: string;
          created_at: string;
        }) => ({
          id: issue.id,
          title: issue.title,
          author: issue.user.login,
          url: issue.html_url,
          createdAt: issue.created_at,
        }),
      ),

      topContributors: contributors.map(
        (c: {
          login: string;
          avatar_url: string;
          contributions: number;
          html_url: string;
        }) => ({
          login: c.login,
          avatarUrl: c.avatar_url,
          contributions: c.contributions,
          url: c.html_url,
        }),
      ),

      cachedAt: new Date().toISOString(),
    };
  },
};
