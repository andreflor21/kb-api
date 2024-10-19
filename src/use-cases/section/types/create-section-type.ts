import type { SectionTypesRepository } from "@/repositories/section-types-repository"
import type { SectionType } from "@prisma/client"

interface CreateTypeUseCaseRequest {
	abreviation: string
	description: string
}

interface CreateSectionTypeUseCaseResponse {
	sectionType: Partial<SectionType>
}

export class CreateSectionTypeUseCase {
	constructor(private sectionTypesRepository: SectionTypesRepository) {}

	async execute({
		abreviation,
		description,
	}: CreateTypeUseCaseRequest): Promise<CreateSectionTypeUseCaseResponse> {
		const sectionType = await this.sectionTypesRepository.createSectionType(
			{
				abrev: abreviation,
				description,
			},
		)

		return { sectionType }
	}
}
