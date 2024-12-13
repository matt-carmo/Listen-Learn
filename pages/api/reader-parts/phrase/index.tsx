import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import prisma from "@/app/lib/prisma";

export const config = {
  api: {
    bodyParser: false, // Desativa o body parser padrão do Next.js
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const form = formidable({ multiples: false }); // Permite apenas um arquivo

    form.parse(req, (err, fields, files: any) => {
      if (err) {
        console.error("Error parsing the file:", err);
        return res.status(500).json({ error: "Failed to process the file" });
      }

      console.log("Files received:", files); // Log para verificar estrutura de files

      const file: any = files.file[0];

      if (file && file.filepath) {
        console.log("File details:", file); // Log para verificar detalhes do arquivo

        // Cria o diretório se não existir
        const audioDir = path.join(process.cwd(), "public", "audio");
        if (!fs.existsSync(audioDir)) {
          fs.mkdirSync(audioDir, { recursive: true });
        }

        // Nome do arquivo (fallback para "uploaded-file" se necessário)
        const fileName = file.originalFilename.replaceAll(" ", "-");
        const newPath = path.join(audioDir, fileName.replaceAll(" ", "-"));
        
        // Move o arquivo para o destino final
        fs.rename(file.filepath, newPath, async (err) => {
          if (err) {
            console.error("Error moving the file:", err);
            return res.status(500).json({ error: "Failed to save the file" });
          }
          if(!fields.textOriginal || !fields.textTranslation || !fields.bookPartId) {
            return res.status(400).json({ error: "Missing required fields" });
          }
          
         const data = await  prisma.phrases.create({
            data: {
              textOriginal: fields.textOriginal[0],
              textTranslation: fields.textTranslation[0],
              audio: fileName,
              bookPartId: Number(fields.bookPartId[0]),
              
            },
          })
          return res.status(200).json(data);
        });
      } else {
        console.error("Filepath is missing or invalid:", file);
        return res.status(400).json({ error: "No valid file uploaded" });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
  
}
