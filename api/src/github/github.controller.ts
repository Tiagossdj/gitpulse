import type { RepoHealthResult } from "./github.service.js";

export class GitHubController {
	constructor(
		private readonly deps: {
			getRepoHealth(owner: string, name: string): Promise<RepoHealthResult>;
		},
	) {}

	async getRepoHealth(owner: string, name: string) {
		return this.deps.getRepoHealth(owner, name);
	}
}
