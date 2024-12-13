import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" && req.body.title) {
    const readers = await prisma.books.create({
      data: {
        title: req.body.title,
      },
    });
    return res.status(200).json(readers);
  }
  if (req.method === "DELETE") {
    await prisma.books.delete({
      where: {
        id: req.body.id,
      },
    });
    return res.status(200).json({ message: "Reader deleted" });
  }
 

  res.setHeader("Allow", ["POST, GET, DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
