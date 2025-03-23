import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const folderPath = "public/audio";
   // Verifica se a pasta existe
    if (fs.existsSync(folderPath)) {
      // Lê os arquivos da pasta
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error("Erro ao ler a pasta:", err);
          return;
        }
        return res.status(200).json(files);
      });
    } else {
        console.error("Pasta não encontrada");
        return res.status(404).end("Pasta não encontrada");
    }
  }
  if(req.method === "PUT") {
    const {  phraseId } = req.body;

 
    const audio = await prisma.phrases.update({
      where: {
        id: phraseId,
      },
      data: {
        audio: req.body.audio,
      },
    });
    return res.status(200).json(audio);
  }
}
