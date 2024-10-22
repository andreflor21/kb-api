import type { ProfilesRepository } from "@/repositories/profiles-repository"

interface linkProfileToRouteUseCaseRequest {
	id: string
	routeId: string
}

export class LinkProfileToRouteUseCase {
	constructor(private profilesRepository: ProfilesRepository) {}

	async link({
		id,
		routeId,
	}: linkProfileToRouteUseCaseRequest): Promise<void> {
		await this.profilesRepository.linkProfileToRoute(id, routeId)
	}
	async unlink({
		id,
		routeId,
	}: linkProfileToRouteUseCaseRequest): Promise<void> {
		await this.profilesRepository.unlinkProfileToRoute(id, routeId)
	}
}
