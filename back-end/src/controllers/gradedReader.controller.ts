import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

interface CreateGradedReaderRequest {
  title: string
}

export const gradedReaderController = {
  async create(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Body: CreateGradedReaderRequest }>,
    reply: FastifyReply
  ) {
    try {
      const { prisma } = fastify
      const { title } = request.body

      console.log(request.body)
      if (!title.trim()) {
        return reply.status(400).send({ error: "Title is required" })
      }
      const gradedReader = await prisma.gradedReader.create({
        data: {
          title,
        },
      })
      reply.status(201).send({
        message: "Graded Reader created successfully",
        data: gradedReader,
      })
    } catch (error) {
      fastify.log.error(error)
      console.error(error)
      reply.status(500).send({ error: error })
    }
  },
  async readAll(
    fastify: FastifyInstance,
    _request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { prisma } = fastify
      const data = await prisma.gradedReader.findMany({
        select: {
          title: true,
          id:true,
          deleted: true
        },
        where:{
          deleted:false
        }
      })
      return reply.status(200).send(data)
    } catch (err) {
      reply.status(500).send({ err })
    }
  },
  async update(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Params: { id: string}, Body: { title: string} }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params
      const { title } = request.body
      const { prisma } = fastify
      if (!title.trim()) {
        return reply.status(400).send({ error: "Title is required" })
      }
      const gradedReader = await prisma.gradedReader.update({
        where: {
          id,
        },
        data: {
          title,
        },
      })

      return reply.status(200).send(gradedReader)
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
      const gradedReader = await prisma.gradedReader.update({
        where: {
          id,
        },
        data: {
          deleted: true,
        },
      })
      return reply.status(200).send({gradedReader, messsage: "Ok"})
    } catch (err) {
      reply.status(500).send(err)
    }
  },
}
