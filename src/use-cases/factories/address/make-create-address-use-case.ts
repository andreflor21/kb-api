import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository"
import { CreateAddressUseCase } from "@/use-cases/address/create-address"

export const makeCreateAddressUseCase = (): CreateAddressUseCase => {
	const addressRepository = new PrismaAddressRepository()
	return new CreateAddressUseCase(addressRepository)
}
