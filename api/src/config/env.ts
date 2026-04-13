export type Env = {
  PORT: number
  NODE_ENV: "development" | "test" | "production"
  GITHUB_TOKEN?: string
  REDIS_URL: string
  CACHE_TTL: number
}

export function getEnv(): Env {
  const PORT = Number(process.env.PORT ?? 3000)
  const NODE_ENV = (process.env.NODE_ENV ?? "development") as Env["NODE_ENV"]
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const REDIS_URL = process.env.REDIS_URL ?? "redis://localhost:6379"
  const CACHE_TTL = Number(process.env.CACHE_TTL ?? 600)

  return { PORT, NODE_ENV, GITHUB_TOKEN, REDIS_URL, CACHE_TTL }
}
