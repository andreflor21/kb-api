import type { SectionTypesRepository } from "@/repositories/section-types-repository"

export class DeleteSectionTypeUseCase {
	constructor(private sectionTypesRepository: SectionTypesRepository) {}

	async execute(id: string): Promise<void> {
		await this.sectionTypesRepository.deleteSectionType(id)
	}
}
