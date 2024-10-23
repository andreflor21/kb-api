import type { SectionsRepository } from "@/repositories/sections-repository"
import type { Section } from "@prisma/client"

type ListSectionsUseCaseRequest = {
	skip: number
	take: number
}
type ListSectionsUseCaseResponse = {
	sections: Partial<Section>[]
	totalSections: number
}

export class ListSectionsUseCase {
	constructor(private sectionsRepository: SectionsRepository) {}

	async execute({
		skip,
		take,
	}: ListSectionsUseCaseRequest): Promise<ListSectionsUseCaseResponse> {
		const sections = await this.sectionsRepository.getSections(skip, take)
		const totalSections = await this.sectionsRepository.countSections()

		return { sections, totalSections }
	}
}
