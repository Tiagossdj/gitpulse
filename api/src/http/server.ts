import cors from "@fastify/cors"
import Fastify from "fastify"
import { errorHandler } from "./error-handler.js"
import { githubRoutes } from "../github/github.routes.js"

export function buildServer() {
  const app = Fastify()

  app.register(cors, { origin: true })
  app.setErrorHandler(errorHandler)

  app.get("/health", async () => ({ ok: true }))
  app.register(githubRoutes, { prefix: "/api" })

  return app
}

