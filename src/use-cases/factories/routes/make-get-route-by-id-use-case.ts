import { PrismaRoutesRepository } from "@/repositories/prisma/prisma-routes-repository"
import { GetRouteByIdUseCase } from "../../routes/get-route-by-id"

export function makeGetRouteByIdUseCase() {
	const routesRepository = new PrismaRoutesRepository()
	const getRouteByIdUseCase = new GetRouteByIdUseCase(routesRepository)

	return getRouteByIdUseCase
}
