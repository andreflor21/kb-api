import { PrismaAddressTypeRepository } from "@/repositories/prisma/prisma-address-type-repository"
import { DeleteAddressTypeUseCase } from "@/use-cases/address/types/delete-address-type"

export const makeDeleteAddressTypeUseCase = (): DeleteAddressTypeUseCase => {
	const addressTypeRepository = new PrismaAddressTypeRepository()
	return new DeleteAddressTypeUseCase(addressTypeRepository)
}
