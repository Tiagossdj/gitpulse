"use client";

export function GridBackground() {
	return (
		<div className="pointer-events-none fixed inset-0 overflow-hidden">
			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: `
            linear-gradient(rgba(0, 217, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.3) 1px, transparent 1px)
          `,
					backgroundSize: "50px 50px",
					maskImage:
						"radial-gradient(ellipse at center, black 20%, transparent 80%)",
					WebkitMaskImage:
						"radial-gradient(ellipse at center, black 20%, transparent 80%)",
				}}
			/>

			<div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse-glow rounded-full bg-primary/5 blur-3xl" />
			<div className="absolute bottom-0 right-1/4 h-96 w-96 animate-pulse-glow rounded-full bg-accent/5 blur-3xl [animation-delay:1s]" />
			<div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-float rounded-full bg-linear-to-r from-primary/3 to-accent/3 blur-3xl" />

			<div
				className="absolute left-0 right-0 top-0 h-px animate-[scan_8s_ease-in-out_infinite] bg-linear-to-r from-transparent via-primary/50 to-transparent"
				style={{ animation: "scan 8s ease-in-out infinite" }}
			/>

			<style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
		</div>
	);
}

