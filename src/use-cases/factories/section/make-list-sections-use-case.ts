import { PrismaSectionRepository } from "@/repositories/prisma/prisma-section-repository"
import { ListSectionsUseCase } from "../../section/list-sections"

export function makeListSectionsUseCase() {
	const sectionRepository = new PrismaSectionRepository()
	const listSectionsUseCase = new ListSectionsUseCase(sectionRepository)

	return listSectionsUseCase
}
