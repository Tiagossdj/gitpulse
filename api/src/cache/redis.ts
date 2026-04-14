import Redis from "ioredis";
import { getEnv } from "../config/env.js";

let client: Redis | null = null;

export function redis() {
	if (client) return client;
	const { REDIS_URL } = getEnv();
	client = new Redis(REDIS_URL, {
		lazyConnect: true,
		enableOfflineQueue: false,
	});
	// Avoid crashing the process when Redis is down.
	client.on("error", () => {});
	return client;
}
