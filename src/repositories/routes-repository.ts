import type { Prisma, Routes } from "@prisma/client"

export interface RoutesRepository {
	createRoute(data: Prisma.RoutesCreateInput): Promise<Routes>
	getRouteById(id: string): Promise<Routes | null>
	getRoutes(): Promise<Routes[]>
	updateRoute(
		id: string,
		data: Prisma.RoutesUpdateInput,
	): Promise<Routes | null>
	deleteRoute(id: string): Promise<void>
	// Adicione outros métodos necessários aqui
}
