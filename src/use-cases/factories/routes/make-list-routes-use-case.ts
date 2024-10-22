import { PrismaRoutesRepository } from "@/repositories/prisma/prisma-routes-repository"
import { ListRoutesUseCase } from "../../routes/list-routes"

export function makeListRoutesUseCase() {
	const routesRepository = new PrismaRoutesRepository()
	const listRoutesUseCase = new ListRoutesUseCase(routesRepository)

	return listRoutesUseCase
}
