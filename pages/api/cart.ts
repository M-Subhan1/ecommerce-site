import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.$queryRaw`SELECT * FROM User;`;
    console.log(users);
    return {
      users,
    };
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      error: err,
    };
  }
}
