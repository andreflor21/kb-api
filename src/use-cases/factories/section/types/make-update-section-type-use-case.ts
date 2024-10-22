import { PrismaSectionTypesRepository } from "@/repositories/prisma/prisma-section-types-repository"
import { UpdateSectionTypeUseCase } from "@/use-cases/section/types/update-section-type"

export function makeUpdateSectionTypeUseCase() {
	const sectionTypesRepository = new PrismaSectionTypesRepository()
	const updateSectionTypeUseCase = new UpdateSectionTypeUseCase(
		sectionTypesRepository,
	)

	return updateSectionTypeUseCase
}
