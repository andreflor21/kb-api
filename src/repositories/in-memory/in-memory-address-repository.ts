import { randomUUID } from "node:crypto"
import type { Prisma, SupplierAddress } from "@prisma/client"
import type { AddressRepository } from "../address-repository"

export class InMemoryAddressRepository implements AddressRepository {
	private addresses: SupplierAddress[] = []

	public async createAddress(
		data: Prisma.SupplierAddressCreateInput,
	): Promise<SupplierAddress> {
		const newAddress: SupplierAddress = {
			id: randomUUID(),
			lograd: data.lograd,
			number: data.number,
			complement: data.complement ?? null,
			zipcode: data.zipcode,
			district: data.district,
			city: data.city,
			state: data.state,
			addressTypeId: data.addressType?.connect?.id ?? null,
			supplierId: data.supplier.connect?.id ?? randomUUID(),
		}

		this.addresses.push(newAddress)

		return newAddress
	}

	public async getAddresses(): Promise<SupplierAddress[]> {
		return this.addresses
	}

	public async getAddressById(id: string): Promise<SupplierAddress | null> {
		const address = this.addresses.find((address) => address.id === id)

		return address ? address : null
	}

	public async getAddressesBySupplierId(
		supplierId: string,
	): Promise<SupplierAddress[]> {
		return this.addresses.filter(
			(address) => address.supplierId === supplierId,
		)
	}

	public async updateAddress(
		id: string,
		data: Prisma.SupplierAddressUpdateInput,
	): Promise<SupplierAddress | null> {
		const findAddress = this.addresses.find((address) => address.id === id)

		if (findAddress) {
			findAddress.lograd = (data.lograd as string) ?? findAddress.lograd
			findAddress.number = (data.number as string) ?? findAddress.number
			findAddress.complement =
				(data.complement as string) ?? findAddress.complement
			findAddress.zipcode =
				(data.zipcode as string) ?? findAddress.zipcode
			findAddress.district =
				(data.district as string) ?? findAddress.district
			findAddress.city = (data.city as string) ?? findAddress.city
			findAddress.state = (data.state as string) ?? findAddress.state
			findAddress.addressTypeId =
				data.addressType?.connect?.id ?? findAddress.addressTypeId
			this.addresses[this.addresses.map((x) => x.id).indexOf(id)] =
				findAddress
			return findAddress
		}
		return null
	}

	public async deleteAddress(id: string): Promise<void> {
		this.addresses = this.addresses.filter((address) => address.id !== id)
	}
}
