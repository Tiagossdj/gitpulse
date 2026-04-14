import type { RepoHealth } from "./github.types";

export class ApiError extends Error {
	constructor(
		public readonly status: number,
		message: string,
	) {
		super(message);
		this.name = "ApiError";
	}
}

export type RepoHealthResponse = {
	data: RepoHealth;
	cacheHit: boolean;
	cacheTtl: number | null;
};

function getApiBase(): string {
	const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
	return base.replace(/\/$/, "");
}

export async function fetchRepoHealth(
	owner: string,
	name: string,
): Promise<RepoHealthResponse> {
	const res = await fetch(`${getApiBase()}/api/repo/${owner}/${name}`, {
		cache: "no-store",
	});

	const xCache = res.headers.get("X-Cache");
	const xTtl = res.headers.get("X-Cache-TTL");

	if (!res.ok) {
		const body = (await res.json().catch(() => ({}))) as { message?: string };
		throw new ApiError(res.status, body.message ?? `Erro ${res.status}`);
	}

	const data = (await res.json()) as RepoHealth;

	return {
		data,
		cacheHit: xCache === "HIT",
		cacheTtl: xTtl !== null && xTtl !== "" ? Number(xTtl) : null,
	};
}
