import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" && req.query.bookId) {
    const readers = await prisma.bookPart.findMany({
      where: {
        bookId: parseInt(req.query.bookId as string),
      },
    });

    return res.status(200).json(readers);
  }
  if (req.method === "POST") {
    const readers = await prisma.bookPart.create({
      data: {
        title: req.body.title,
        bookId: req.body.bookId,
      },
    });
    return res.status(200).json(readers);
  }

  res.setHeader("Allow", ["POST, GET, DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
