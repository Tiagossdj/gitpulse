export function parseRepoInput(
	raw: string,
): { owner: string; name: string } | null {
	const s = raw.trim();
	if (!s) return null;

	const urlMatch = s.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
	if (urlMatch) {
		return {
			owner: urlMatch[1],
			name: urlMatch[2].replace(/\.git$/i, ""),
		};
	}

	const parts = s.split("/").filter(Boolean);
	if (parts.length === 2) {
		return {
			owner: parts[0],
			name: parts[1].replace(/\.git$/i, ""),
		};
	}

	return null;
}
