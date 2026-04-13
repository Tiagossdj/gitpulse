import { getEnv } from "../config/env.js";
import { buildServer } from "./server.js";

const app = buildServer();
const { PORT } = getEnv();

await app.listen({ port: PORT, host: "0.0.0.0" });
