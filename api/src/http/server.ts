import cors from "@fastify/cors";
import Fastify from "fastify";
import { redis } from "../cache/redis.js";
import { githubRoutes } from "../github/github.routes.js";
import { errorHandler } from "./error-handler.js";

export function buildServer() {
	const app = Fastify();

	app.register(cors, {
		origin: true,
		exposedHeaders: ["X-Cache", "X-Cache-TTL"],
	});
	app.setErrorHandler(errorHandler);

	app.get("/health", async () => {
		let redisOk = false;
		try {
			redisOk = (await redis().ping()) === "PONG";
		} catch {
			redisOk = false;
		}
		return { ok: true, redis: redisOk };
	});
	app.register(githubRoutes, { prefix: "/api" });

	return app;
}
