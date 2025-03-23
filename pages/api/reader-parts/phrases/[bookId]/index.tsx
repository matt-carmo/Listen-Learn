import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" && req.query.bookId) {
    console.log(req.query)
    const readers = await prisma.phrases.findMany({
      where: {
        bookPartId: Number(req.query.bookId),

      },
      
      
      
    });
    return res.status(200).json(readers);
  }
 

  res.setHeader("Allow", ["POST, GET, DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
