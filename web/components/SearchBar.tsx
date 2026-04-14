"use client";

import { Search } from "lucide-react";
import { useMemo } from "react";

type Props = {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	disabled?: boolean;
};

export function SearchBar({ value, onChange, onSubmit, disabled }: Props) {
	const hasQuery = useMemo(() => value.trim().length > 0, [value]);

	return (
		<form
			className="group relative w-full max-w-2xl"
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit();
			}}
		>
			<div className="absolute inset-0 rounded-2xl bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />

			<div className="relative flex items-center overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all hover:border-primary/30 focus-within:border-primary/50">
				<div className="flex items-center justify-center py-4 pr-4 pl-6 text-muted-foreground transition-colors group-focus-within:text-primary">
					<Search className="h-5 w-5" />
				</div>

				<input
					type="search"
					placeholder="owner/repo ou URL do GitHub"
					value={value}
					disabled={disabled}
					onChange={(e) => onChange(e.target.value)}
					className="flex-1 bg-transparent py-4 pr-6 text-foreground outline-none placeholder:text-muted-foreground/60"
					autoFocus
				/>

				{hasQuery ? (
					<button
						type="submit"
						disabled={disabled}
						className="group/btn relative mr-3 overflow-hidden rounded-xl bg-linear-to-r from-primary to-primary/80 px-6 py-2.5 text-primary-foreground transition-all hover:from-primary/90 hover:to-primary/70 hover:shadow-lg hover:shadow-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<span className="relative z-10">
							{disabled ? "Analyzing..." : "Analyze"}
						</span>
						<div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover/btn:translate-y-0" />
					</button>
				) : null}
			</div>

			{!disabled && hasQuery ? (
				<div className="mono absolute -bottom-8 left-0 text-xs text-muted-foreground">
					Press Enter to analyze
				</div>
			) : null}
		</form>
	);
}
