import { PrismaSectionTypesRepository } from "@/repositories/prisma/prisma-section-types-repository"
import { ListSectionTypeUseCase } from "@/use-cases/section/types/list-section-types"

export function makeListSectionTypeUseCase() {
	const sectionTypesRepository = new PrismaSectionTypesRepository()
	const listSectionTypeUseCase = new ListSectionTypeUseCase(
		sectionTypesRepository,
	)

	return listSectionTypeUseCase
}
