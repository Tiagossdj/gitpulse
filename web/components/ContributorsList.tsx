"use client";

import type { Contributor } from "@/lib/github.types";
import { Users } from "lucide-react";
import { motion } from "motion/react";

type Props = {
	contributors: Contributor[];
};

function avatarUrl(login: string) {
	return `https://github.com/${encodeURIComponent(login)}.png?size=80`;
}

export function ContributorsList({ contributors }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3, duration: 0.4 }}
			className="rounded-xl border border-border bg-card p-6"
		>
			<div className="mb-6 flex items-center gap-3">
				<div className="rounded-lg bg-linear-to-br from-green-500/20 to-green-600/20 p-2.5">
					<Users className="h-5 w-5 text-green-400" />
				</div>
				<h3 className="text-lg">Top Contributors</h3>
			</div>

			<div className="space-y-3">
				{contributors.map((contributor, index) => (
					<motion.a
						key={contributor.login}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.4 + index * 0.1 }}
						href={contributor.url}
						target="_blank"
						rel="noreferrer"
						className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-secondary/50"
					>
						<div className="relative">
							<div className="absolute inset-0 rounded-full bg-primary/30 blur-md opacity-0 transition-opacity group-hover:opacity-100" />
							<img
								src={avatarUrl(contributor.login)}
								alt={contributor.login}
								className="relative h-10 w-10 rounded-full ring-2 ring-border"
								loading="lazy"
							/>
						</div>

						<div className="min-w-0 flex-1">
							<p className="truncate text-sm">{contributor.login}</p>
							<p className="mono text-xs text-muted-foreground">
								{contributor.contributions} commits
							</p>
						</div>

						<div className="mono shrink-0 rounded-md bg-primary/10 px-2.5 py-1 text-xs text-primary">
							#{index + 1}
						</div>
					</motion.a>
				))}
			</div>
		</motion.div>
	);
}

