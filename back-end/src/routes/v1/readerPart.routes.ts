import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

import { ReaderPart } from "@prisma/client"
import { readerPartController } from "../../controllers/readerPart.controller"

export function partsRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/:readerId/parts",
    async (
      request: FastifyRequest<{
        Body: ReaderPart
        Params: { readerId: string }
      }>,
      reply: FastifyReply
    ) => {
      return readerPartController.create(fastify, request, reply)
    }
  )
  fastify.get(
    "/:readerId/parts",
    async (
      request: FastifyRequest<{ Body: ReaderPart, Params: { readerId: string } }>,
      reply: FastifyReply
    ) => {
      return readerPartController.readAll(fastify, request, reply)
    }
  )
  fastify.put(
    "/parts/:id",
    async (
      request: FastifyRequest<{ Body: ReaderPart; Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      return readerPartController.update(fastify, request, reply)
    }
  )
  fastify.delete(
    "/parts/:id",
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      return readerPartController.delete(fastify, request, reply)
    }
  )
}
