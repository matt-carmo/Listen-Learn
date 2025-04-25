import { FileAudio } from "@prisma/client"
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import path from "path"
import fs from "fs"
import { pipeline } from "node:stream/promises"

//
export const fileAudioController = {
  async create(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Body: FileAudio; Params: { readerId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { prisma } = fastify
      const { readerId } = request.params

      // Create uploads directory if it doesn't exist
      const uploadDir = path.join(__dirname, "..", "..", "uploads")
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      // Get the uploaded files (now expecting multiple files)
      const files = await request.files()
      if (!files || (Array.isArray(files) && files.length === 0)) {
          return reply.status(400).send({ error: "No files uploaded" })
        }
        
        const uploadResults = []
        
        // Process each file
        // Process each file
        for await (const file of files) {
          // Validate file type (audio in this case)
          if (!file?.mimetype.startsWith("audio/")) {
            uploadResults.push({
              filename: file.filename,
              error: "Only audio files are allowed",
            })
            continue
          }
          
          // Generate unique filename
          const filename = `${Date.now()}-${file.filename}`
          const filepath = path.join(uploadDir, filename)
          
          try {
            // Save file to disk using streams
            await pipeline(file.file, fs.createWriteStream(filepath))
            
            // Store file metadata in database using Prisma
            const createdFile = await prisma.fileAudio.create({
              data: {
                fileName: filename,
                url: filepath,
                readerId: readerId,
              },
            })
            
            uploadResults.push({
              filename: file.filename,
            success: true,
            file: createdFile,
          })
        } catch (error) {
          uploadResults.push({
            filename: file.filename,
            error: error,
          })
        }
      }
      
      // Check if all uploads failed
      const allFailed  = await uploadResults.every((result) => !result.success)

      if (allFailed) {
        return reply.status(400).send({
          error: "All file uploads failed",
          details: uploadResults,
        })
      }
      
      // Check if some uploads failed
      const someFailed = uploadResults.some((result) => result.error)
      // return reply.status(200).send({ sucess: true, uploadResults })

      return reply.status(someFailed ? 207 : 201).send({
        message: someFailed
          ? "Some files uploaded successfully"
          : "All files uploaded successfully",
        results: uploadResults,
      })
    } catch (error) {
      fastify.log.error(error)

      reply.status(500).send({ error: error })
    }
  },
  async readAllByReaderId(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Params: { readerId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { prisma } = fastify
      const { readerId } = request.params

      const data = await prisma.fileAudio.findMany({
        where: {
          readerId: readerId,
        },
      })
      const dataWithFileName = data.map(item => ({
        ...item,
        shortName: item.fileName.split('-')[1],
      }))

      return reply.status(200).send(dataWithFileName)
    } catch (err) {
      reply.status(500).send({ err })
    }
  },
}
