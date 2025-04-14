import fp from "fastify-plugin"
import { PrismaClient } from "@prisma/client"
import { FastifyInstance, FastifyPluginAsync } from "fastify"

export async function prismaPlugin(fastify: FastifyInstance) {
  const prisma = new PrismaClient()
  if (prisma) {
    await prisma.$connect()
    fastify.log.info("Prisma connected")
    fastify.decorate("prisma", prisma)
    fastify.addHook("onClose", async (fastify) => {
      await fastify.prisma.$disconnect()
      fastify.log.info("Prisma disconnected")
    })
  }
}
export default fp(prismaPlugin, {
  name: 'prisma',
}) as FastifyPluginAsync;