import env from "@/env"
import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
	errorFormat: "pretty",
	log: env.NODE_ENV === "dev" ? [] : [],
})
