import { ReaderPart } from "@prisma/client"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"


export const readerPartController = {
  async create(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Body: ReaderPart, Params: { readerId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { prisma } = fastify
      const { title } = request.body
      if (!title.trim()) {
        return reply.status(400).send({ error: "Title is required" })
      }
      const readerPart = await prisma.readerPart.create({
        data: {
          title,
          gradedReaderId: request.params.readerId,
        },
      })
      reply.status(201).send({
        message: "GradedPart Reader created successfully",
        data: readerPart,
      })
    } catch (error) {
      fastify.log.error(error)
      reply.status(500).send({ error: error })
    }
  },
  async readAll(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Body: ReaderPart, Params: { readerId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { prisma } = fastify
      const readerPart = await prisma.readerPart.findMany({
        select: {
          title: true,
          id: true,
          gradedReaderId: true,
        },
        where: {
          deleted: false,
          gradedReaderId: request.params.readerId,
        },
      })
      reply.status(200).send(readerPart)
    } catch (error) {
      fastify.log.error(error)
      reply.status(500).send({ error: error })
    }
  },
  async update(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Params: { id: string }; Body: { title: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params
      const { title } = request.body
      const { prisma } = fastify
      if (!title.trim()) {
        return reply.status(400).send({ error: "Title is required" })
      }
      const readerPart = await prisma.readerPart.update({
        where: {
          id,
        },
        data: {
          title,
        },
      })

      return reply.status(200).send(readerPart)
    } catch (err) {
      return reply.status(500).send(err)
    }
  },
  async delete(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params
      const { prisma } = fastify
      const readerPart = await prisma.readerPart.delete({
        where: {
          id,
        },
      })
      return reply.status(200).send(readerPart)
    } catch (err) {
      return reply.status(500).send(err)
    }
  },
}
