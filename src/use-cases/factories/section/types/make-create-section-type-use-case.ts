import { PrismaSectionTypesRepository } from "@/repositories/prisma/prisma-section-types-repository"
import { CreateSectionTypeUseCase } from "@/use-cases/section/types/create-section-type"

export function makeCreateSectionTypeUseCase() {
	const sectionTypesRepository = new PrismaSectionTypesRepository()
	const createSectionTypeUseCase = new CreateSectionTypeUseCase(
		sectionTypesRepository,
	)

	return createSectionTypeUseCase
}
