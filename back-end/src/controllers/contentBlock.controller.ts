import { ContentBlock } from "@prisma/client"
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"

export const contentBlockController = {
  async create(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Body: ContentBlock, Params: { partId: string } }>,
    reply: FastifyReply
  ) {
    try {
      
      const { originalText, translatedText,  audioUrl } = request.body
      const { partId } = request.params
      const { prisma } = fastify
      if (!originalText.trim()) {
        return reply.status(400).send({ error: "Original text is required" })
      }
      if (!translatedText.trim()) {
        return reply.status(400).send({ error: "Translated text is required" })
      }

      const contentBlock = await prisma.contentBlock.create({
        data: {
          originalText,
          translatedText,
          audioUrl,
          partId,
          order: 0,
        },
      })

      return reply.status(201).send(contentBlock)
    } catch (error) {
      fastify.log.error(error)
      reply.status(500).send({ error: 'error' })
    }
  },
  async readAll(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Params: { partId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { prisma } = fastify
      const { partId } = request.params
      const data = await prisma.contentBlock.findMany({
        select: {
          originalText: true,
          translatedText: true,
          audioUrl: true,
          id:true,
        },
        where:{
          partId
        }
      })
      return reply.status(200).send(data)
    } catch (err) {
      reply.status(500).send({ err })
    }
  },
  async update(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Params: { id: string}, Body: ContentBlock }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params
      const { audioUrl, order, originalText, translatedText  } = request.body
      const { prisma } = fastify

   
      if (!originalText && !translatedText && audioUrl) {
        try {
          // First check if the record exists
          const existingBlock = await prisma.contentBlock.findUnique({
            where: { id },
          });
      
          if (!existingBlock) {
            return reply.status(404).send({ error: 'Content block not found' });
          }
      
          const contentBlock = await prisma.contentBlock.update({
            where: { id },
            data: { audioUrl },
          });
          
          return reply.status(200).send(contentBlock);
        } catch (error) {
          console.error('Error updating content block:', error);
          return reply.status(500).send({ error: 'Failed to update content block' });
        }
      }
      if (!originalText.trim()) {
        return reply.status(400).send({ error: "Original text is required" })
      }
      if (!translatedText.trim()) {
        return reply.status(400).send({ error: "Translated text is required" })
      }
      const contentBlock = await prisma.contentBlock.update({
        where: {
          id,
        },
        data: {
          originalText,
          translatedText,
          audioUrl,
          order: order,
        },
      })

      return reply.status(200).send(contentBlock)
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
      const contentBlock = await prisma.contentBlock.delete({
        where: {
          id,
        },
      })
      return reply.status(200).send({contentBlock, messsage: "Ok"})
    } catch (err) {
      reply.status(500).send(err)
    }
  },
}