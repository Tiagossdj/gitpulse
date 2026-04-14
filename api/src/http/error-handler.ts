import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../errors/AppError.js";

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  return reply.status(500).send({ message: "Internal Server Error" });
}
