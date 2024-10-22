import { PrismaAddressTypeRepository } from "@/repositories/prisma/prisma-address-type-repository"
import { ListAddressTypesUseCase } from "@/use-cases/address/types/list-address-types"

export const makeListAddressTypesUseCase = (): ListAddressTypesUseCase => {
	const addressTypeRepository = new PrismaAddressTypeRepository()
	return new ListAddressTypesUseCase(addressTypeRepository)
}
