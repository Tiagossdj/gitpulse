"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRepoHealth } from "../api";

export function useRepoHealth(owner: string | null, name: string | null) {
	return useQuery({
		queryKey: ["repoHealth", owner, name],
		queryFn: () => fetchRepoHealth(owner as string, name as string),
		enabled: Boolean(owner && name),
	});
}
