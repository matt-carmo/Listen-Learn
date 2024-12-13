import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" && !req.query.bookId) {


    const readers = await prisma.books.findMany();
    return res.status(200).json(readers);
  }
  if (req.method === "GET" && req.query.bookId) {


    const readers = await prisma.bookPart.findMany({
      where: {
        bookId: Number(req.query.bookId),

    }});
    return res.status(200).json(readers);
  }


  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
