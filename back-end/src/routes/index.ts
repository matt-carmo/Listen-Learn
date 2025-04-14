import { FastifyInstance } from "fastify";

import gradedReaderRoutes from "./v1/gradedReader.routes";
import { partsRoutes } from "./v1/readerPart.routes";
import { contentBlockRoutes } from "./v1/contentBlock.routes";
import { fastifyMultipart } from "@fastify/multipart";

import fileAudio from "./v1/fileAudio.routes";

// For multiple routes
export default async function (fastify: FastifyInstance) {
  fastify.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // Limite de 10MB para arquivos de áudio
      files: 20 // Permitir apenas 1 arquivo por vez
    }
  });

  fastify.register(gradedReaderRoutes);
  fastify.register(partsRoutes);
  fastify.register(contentBlockRoutes);
  fastify.register(fileAudio);
}