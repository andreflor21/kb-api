import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository"
import { GetAddressByIdUseCase } from "@/use-cases/address/get-address-by-id"

export const makeGetAddressByIdUseCase = (): GetAddressByIdUseCase => {
	const addressRepository = new PrismaAddressRepository()
	return new GetAddressByIdUseCase(addressRepository)
}
