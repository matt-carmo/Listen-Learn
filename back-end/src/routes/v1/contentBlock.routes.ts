import { ContentBlock } from "@prisma/client"
import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "fastify/types/request"
import { contentBlockController } from "../../controllers/contentBlock.controller"

export function contentBlockRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/content-blocks/:partId",
    async (
      request: FastifyRequest<{
        Body: ContentBlock
        Params: { partId: string }
      }>,
      reply: FastifyReply
    ) => {
      return contentBlockController.create(fastify, request, reply)
    }
  );
  fastify.get(
    "/content-blocks/:partId",
    async (
      request: FastifyRequest<{
        Body: ContentBlock
        Params: { partId: string }
      }>,
      reply: FastifyReply
    ) => {
      return contentBlockController.readAll(fastify, request, reply)
    }
  );
  fastify.put(
    "/content-blocks/:id",
    async (
      request: FastifyRequest<{ Params: { id: string}, Body: ContentBlock }>,
      reply: FastifyReply
    ) => {
      return contentBlockController.update(fastify, request, reply)
    }
  )
  fastify.delete(
    "/content-blocks/:id",
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      return contentBlockController.delete(fastify, request, reply)
    }
  );
}