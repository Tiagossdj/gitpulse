import { getEnv } from "../config/env.js";
import { buildServer } from "./server.js";

async function start() {
  const app = buildServer();
  const { PORT } = getEnv();

  await app.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
}

start();
