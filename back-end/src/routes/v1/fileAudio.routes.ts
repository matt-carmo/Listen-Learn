import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { fileAudioController } from "../../controllers/fileAudio.controller"
import { FileAudio } from "@prisma/client"


export default async function fileAudioRoutes(fastify: FastifyInstance) {
 fastify.post(
     "/file-audio/:readerId",
     async (
       request: FastifyRequest<{
         Body: FileAudio
         Params: { readerId: string }
       }>,
       reply: FastifyReply
     ) => {
       return fileAudioController.create(fastify, request, reply)
     }
   )
   fastify.get(
    "/file-audio/:readerId",
    async (
      request: FastifyRequest<{
        Body: FileAudio
        Params: { readerId: string }
      }>,
      reply: FastifyReply
    ) => {
      return fileAudioController.readAllByReaderId(fastify, request, reply)
    }
  )
 
}
