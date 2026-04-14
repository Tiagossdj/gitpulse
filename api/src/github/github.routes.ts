import type { FastifyInstance } from "fastify";
import { GitHubController } from "./github.controller.js";
import { githubRepository } from "./github.repository.js";
import { createGitHubService } from "./github.service.js";

export async function githubRoutes(app: FastifyInstance) {
  const service = createGitHubService({ github: githubRepository });
  const controller = new GitHubController(service);

  app.get("/repo/:owner/:name", async (request, reply) => {
    const { owner, name } = request.params as { owner: string; name: string };
    const result = await controller.getRepoHealth(owner, name);

    reply.header("X-Cache", result.cache.hit ? "HIT" : "MISS");
    reply.header("X-Cache-TTL", String(result.cache.ttl));
    return result.data;
  });

  app.delete("/repo/:owner/:name/cache", async (request) => {
    const { owner, name } = request.params as { owner: string; name: string };
    await service.invalidateRepoCache(owner, name);
    return { invalidated: true };
  });
}
