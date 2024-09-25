import { randomUUID } from "node:crypto"
import type { SupplierRepository } from "@/repositories/supplier-repository"
import { SupplierAlreadyExistsError } from "@/shared/errors/supplier-already-exists-error"
import { SupplierNotFoundError } from "@/shared/errors/supplier-not-found-error"
import type { SupplierExtended } from "@/types/supplier-extended"
import { type Prisma, Supplier } from "@prisma/client"

export class InMemorySupplierRepository implements SupplierRepository {
	private suppliers: SupplierExtended[] = []

	async createSupplier(
		data: Prisma.SupplierCreateInput,
	): Promise<SupplierExtended> {
		const checkSupplier = this.suppliers.find(
			(supplier) => supplier.cnpj === data.cnpj,
		)
		if (checkSupplier) {
			throw new SupplierAlreadyExistsError()
		}
		const supplier: SupplierExtended = {
			id: randomUUID(),
			code: data.code,
			cnpj: data.cnpj,
			name: data.name,
			legalName: data.legalName,
			ERPCode: data.ERPCode,
			fone: data.fone ?? null,
			email: data.email ?? null,
			createdAt: new Date(),
			active: true,
			userId: null,
			addresses: [],
		}
		this.suppliers.push(supplier)
		return supplier as SupplierExtended
	}

	async getSupplierById(id: string): Promise<SupplierExtended | null> {
		const supplier = this.suppliers.find((supplier) => supplier.id === id)
		if (!supplier) throw new SupplierNotFoundError()
		return supplier as SupplierExtended
	}

	async getSuppliers(): Promise<SupplierExtended[]> {
		return this.suppliers as SupplierExtended[]
	}

	async updateSupplier(
		data: Prisma.SupplierUpdateInput,
	): Promise<SupplierExtended | null> {
		const findSupplier = this.suppliers.find(
			(supplier) => supplier.id === data.id,
		)
		if (findSupplier) {
			const updatedSupplier = structuredClone(findSupplier)
			updatedSupplier.code = (data.code as string) ?? findSupplier.code
			updatedSupplier.cnpj = (data.cnpj as string) ?? findSupplier.cnpj
			updatedSupplier.name = (data.name as string) ?? findSupplier.name
			updatedSupplier.legalName =
				(data.legalName as string) ?? findSupplier.legalName
			updatedSupplier.ERPCode =
				(data.ERPCode as string) ?? findSupplier.ERPCode
			updatedSupplier.fone = (data.fone as string) ?? findSupplier.fone
			updatedSupplier.email = (data.email as string) ?? findSupplier.email
			updatedSupplier.userId =
				(data.userResp as string) ?? findSupplier.userId

			this.suppliers[
				this.suppliers.map((x) => x.id).indexOf(data.id as string)
			] = updatedSupplier
			return updatedSupplier as SupplierExtended
		}
		return null
	}

	async updateSupplierStatus(
		id: string,
		status: boolean,
	): Promise<SupplierExtended> {
		const supplierIndex = this.suppliers.findIndex(
			(supplier) => supplier.id === id,
		)
		if (supplierIndex === -1) throw new SupplierNotFoundError()
		this.suppliers[supplierIndex].active = status
		return this.suppliers[supplierIndex] as SupplierExtended
	}

	async deleteSupplier(id: string): Promise<void> {
		const supplierIndex = this.suppliers.findIndex(
			(supplier) => supplier.id === id,
		)
		if (supplierIndex === -1) throw new SupplierNotFoundError()
		this.suppliers.splice(supplierIndex, 1)
	}
}
