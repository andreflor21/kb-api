import type { RoutesRepository } from "@/repositories/routes-repository"
import type { Routes } from "@prisma/client"

interface UpdateRouteUseCaseRequest {
	id: string
	path: string
	description: string
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
}

interface UpdateRouteUseCaseResponse {
	route: Partial<Routes> | null
}

export class UpdateRouteUseCase {
	constructor(private routesRepository: RoutesRepository) {}

	async execute({
		id,
		path,
		description,
		method,
	}: UpdateRouteUseCaseRequest): Promise<UpdateRouteUseCaseResponse> {
		const route = await this.routesRepository.updateRoute(id, {
			path,
			description,
			method,
		})

		return { route }
	}
}
