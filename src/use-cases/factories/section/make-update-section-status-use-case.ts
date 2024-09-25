import { PrismaSectionRepository } from "@/repositories/prisma/prisma-section-repository"
import { UpdateSectionStatusUseCase } from "../../section/update-section-status"

export function makeUpdateSectionStatusUseCase() {
	const sectionRepository = new PrismaSectionRepository()
	const updateSectionStatusUseCase = new UpdateSectionStatusUseCase(
		sectionRepository,
	)

	return updateSectionStatusUseCase
}
