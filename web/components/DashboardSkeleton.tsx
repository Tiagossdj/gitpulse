function Skeleton({ className }: { className: string }) {
	return <div className={`animate-pulse rounded-md ${className}`} />;
}

export function DashboardSkeleton() {
	return (
		<div className="mx-auto w-full max-w-7xl space-y-8 py-12">
			<div className="space-y-4">
				<Skeleton className="h-12 w-96 bg-secondary/40" />
				<Skeleton className="h-6 w-64 bg-secondary/20" />
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={i}
						className="space-y-4 rounded-xl border border-border bg-card p-6"
					>
						<Skeleton className="h-12 w-12 bg-secondary/40" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-24 bg-secondary/20" />
							<Skeleton className="h-8 w-20 bg-secondary/40" />
						</div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="space-y-4 rounded-xl border border-border bg-card p-6"
					>
						<div className="flex items-center gap-3">
							<Skeleton className="h-10 w-10 bg-secondary/40" />
							<Skeleton className="h-6 w-32 bg-secondary/20" />
						</div>
						<div className="space-y-3">
							{Array.from({ length: 5 }).map((__, j) => (
								<Skeleton
									// biome-ignore lint/suspicious/noArrayIndexKey: stable skeleton list
									key={j}
									className="h-16 w-full bg-secondary/20"
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
