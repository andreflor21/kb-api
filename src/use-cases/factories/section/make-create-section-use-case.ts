import { PrismaSectionRepository } from "@/repositories/prisma/prisma-section-repository"
import { CreateSectionUseCase } from "../../section/create-section"

export function makeCreateSectionUseCase() {
	const sectionRepository = new PrismaSectionRepository()
	const createSectionUseCase = new CreateSectionUseCase(sectionRepository)

	return createSectionUseCase
}
