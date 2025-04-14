import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { gradedReaderController } from "../../controllers/gradedReader.controller"

interface CreateGradedReaderBody {
  id: string
  title: string
}
export default async function gradedReaderRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/graded-readers",
    async (
      request: FastifyRequest<{ Body: CreateGradedReaderBody }>,
      reply: FastifyReply
    ) => {
      return gradedReaderController.create(fastify, request, reply)
    }
  )
  fastify.get(
    "/graded-readers",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return gradedReaderController.readAll(fastify, request, reply)
    }
  )
  fastify.put(
    "/graded-readers/:id",
    async (
      request: FastifyRequest<{ Body: CreateGradedReaderBody, Params: CreateGradedReaderBody }>,
      reply: FastifyReply
    ) => {
      return gradedReaderController.update(fastify, request, reply)
    }
  )
  fastify.delete(
    "/graded-readers/:id",
    async (
      request: FastifyRequest<{ Body: CreateGradedReaderBody, Params: CreateGradedReaderBody }>,
      reply: FastifyReply
    ) => {
      return gradedReaderController.delete(fastify, request, reply)
    }
  )
}

