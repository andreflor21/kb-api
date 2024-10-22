import type { SectionsRepository } from "@/repositories/sections-repository"
import { SectionNotFoundError } from "@/shared/errors/section-not-found-error"
import type { Section } from "@prisma/client"

interface GetSectionByIdUseCaseRequest {
	id: string
}

interface GetSectionByIdUseCaseResponse {
	section: Partial<Section> | null
}

export class GetSectionByIdUseCase {
	constructor(private sectionsRepository: SectionsRepository) {}

	async execute({
		id,
	}: GetSectionByIdUseCaseRequest): Promise<GetSectionByIdUseCaseResponse> {
		const section = await this.sectionsRepository.getSectionById(id)
		if (!section) throw new SectionNotFoundError()
		return { section }
	}
}
