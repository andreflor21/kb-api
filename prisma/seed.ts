import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"
import { hash } from "bcryptjs"
const prisma = new PrismaClient()
async function main() {
	const profile1 = await prisma.profile.upsert({
		where: { description: "Admin" },
		update: {},
		create: {
			description: "Admin",
		},
	})
	const profile2 = await prisma.profile.upsert({
		where: { description: "User" },
		update: {},
		create: {
			description: "User",
		},
	})
	const user1 = await prisma.user.upsert({
		where: { email: "kanban@email.com" },
		update: {},
		create: {
			email: "kanban@email.com",
			name: "Kanban",
			hashedPassword: await hash("123456", 10),
			profile: {
				connectOrCreate: {
					where: {
						description: "Admin",
					},
					create: {
						description: "Admin",
					},
				},
			},
		},
	})
	const user2 = await prisma.user.upsert({
		where: { email: "bob@prisma.io" },
		update: {},
		create: {
			email: "bob@prisma.io",
			name: "Bob",
			hashedPassword: await hash("123456", 10),
			profile: {
				connectOrCreate: {
					where: {
						description: "User",
					},
					create: {
						description: "User",
					},
				},
			},
		},
	})
	const section = await prisma.section.upsert({
		where: { description: "Section 001" },
		update: {},
		create: {
			code: "001",
			description: "Section 001",
			branchMatrixCode: "001",
			ERPcode: "001",
			sectionType: {
				connectOrCreate: {
					where: {
						description: "Section Type 001",
					},
					create: {
						description: "Section Type 001",
					},
				},
			},
		},
	})
	const addressType = await prisma.addressType.upsert({
		where: { description: "Address Type 001" },
		update: {},
		create: {
			description: "Address Type 001",
		},
	})
	const supplier = await prisma.supplier.upsert({
		where: { cnpj: "123456789012" },
		update: {},
		create: {
			name: "Supplier 001",
			cnpj: "123456789012",
			email: "supplier01@mail.com",
			fone: "12345678901",
			ERPCode: "001",
			code: "001",
			legalName: "Supplier 001 Ltda",
			addresses: {
				create: {
					lograd: "Rua 001",
					number: "001",
					district: "Bairro 001",
					city: "Cidade 001",
					state: "ES",
					zipcode: "12345678",
					addressType: {
						connect: { id: addressType.id },
					},
				},
			},
		},
	})
	for (let i = 0; i < 15; i++) {
		const type = faker.commerce.department()
		const productType = await prisma.productType.upsert({
			where: { description: type.toUpperCase() },
			update: {},
			create: {
				description: type.toUpperCase(),
			},
		})
		const code = faker.commerce.isbn()
		const product = await prisma.product.upsert({
			where: { code },
			update: {},
			create: {
				code,
				description: faker.commerce.productName(),
				stockUnit: {
					connectOrCreate: {
						where: {
							abrev: "UN",
						},
						create: {
							description: "unidade",
							abrev: "UN",
						},
					},
				},
				productType: {
					connect: { id: productType.id },
				},
			},
		})
	}
	const routes = [
		{
			path: "/login",
			method: "POST",
			description: "Autenticar usuário e retornar token.",
			group: "Usuários",
		},
		{
			path: "/forgot-password",
			method: "POST",
			description: "Enviar instruções de redefinição de senha.",
			group: "Usuários",
		},
		{
			path: "/reset-password/{token_id}",
			method: "POST",
			description: "Redefinir senha do usuário usando token.",
			group: "Usuários",
		},
		{
			path: "/users/new",
			method: "POST",
			description: "Criar um novo usuário.",
			group: "Usuários",
		},
		{
			path: "/users",
			method: "GET",
			description: "Obter uma lista paginada de usuários.",
			group: "Usuários",
		},
		{
			path: "/users/:id",
			method: "GET",
			description: "Obter detalhes do usuário pelo ID.",
			group: "Usuários",
		},
		{
			path: "/users/{id}/edit",
			method: "PATCH",
			description: "Editar os detalhes do usuário.",
			group: "Usuários",
		},
		{
			path: "/users/{id}/change-password",
			method: "PATCH",
			description: "Alterar a senha do usuário.",
			group: "Usuários",
		},
		{
			path: "/users/{id}/delete",
			method: "DELETE",
			description: "Deletar um usuário pelo ID.",
			group: "Usuários",
		},
		{
			path: "/users/{id}/status",
			method: "PUT",
			description: "Atualizar o status ativo do usuário.",
			group: "Usuários",
		},
		{
			path: "/profiles",
			method: "GET",
			description: "Obter uma lista paginada de perfis.",
			group: "Perfil",
		},
		{
			path: "/profiles/{id}/routes/{routeId}/link",
			method: "POST",
			description: "Vincular uma rota a um perfil.",
			group: "Perfil",
		},
		{
			path: "/profiles/{id}/routes/{routeId}/unlink",
			method: "POST",
			description: "Desvincular uma rota de um perfil.",
			group: "Perfil",
		},
		{
			path: "/routes",
			method: "GET",
			description: "Obter detalhes do perfil pelo ID.",
			group: "Perfil",
		},
		{
			path: "/profiles/:id/edit",
			method: "PATCH",
			description: "Editar os detalhes do perfil.",
			group: "Perfil",
		},
		{
			path: "/profiles/:id/delete",
			method: "DELETE",
			description: "Deletar um perfil pelo ID.",
			group: "Perfil",
		},
		{
			path: "/profiles/:id/duplicate",
			method: "POST",
			description: "Duplicar um perfil existente.",
			group: "Perfil",
		},
		{
			path: "/profiles/new",
			method: "POST",
			description: "Criar um novo perfil.",
			group: "Perfil",
		},
		{
			path: "/routes/new",
			method: "POST",
			description: "Vincular uma rota a um perfil.",
			group: "Perfil",
		},
		{
			path: "/profiles/:id/routes/:routeId/unlink",
			method: "POST",
			description: "Desvincular uma rota de um perfil.",
			group: "Perfil",
		},
		{
			path: "/routes",
			method: "GET",
			description: "Obter uma lista de rotas.",
			group: "Rotas",
		},
		{
			path: "/routes/new",
			method: "POST",
			description: "Criar uma nova rota.",
			group: "Rotas",
		},
		{
			path: "/routes/:id",
			method: "GET",
			description: "Obter detalhes de uma rota pelo ID.",
			group: "Rotas",
		},
		{
			path: "/routes/:id/edit",
			method: "PATCH",
			description: "Editar os detalhes de uma rota.",
			group: "Rotas",
		},
		{
			path: "/sections",
			method: "GET",
			description: "Obter uma lista paginada de seções.",
			group: "Seções",
		},
		{
			path: "/sections/new",
			method: "POST",
			description: "Criar uma nova seção.",
			group: "Seções",
		},
		{
			path: "/sections/:id",
			method: "GET",
			description: "Obter detalhes de uma seção pelo ID.",
			group: "Seções",
		},
		{
			path: "/sections/:id/edit",
			method: "PATCH",
			description: "Editar os detalhes de uma seção.",
			group: "Seções",
		},
		{
			path: "/sections/:id/status",
			method: "PUT",
			description: "Atualizar o status de uma seção.",
			group: "Seções",
		},
		{
			path: "/sections/types",
			method: "GET",
			description: "Obter uma lista de tipos de seções.",
			group: "Tipos de Seções",
		},
		{
			path: "/sections/types/new",
			method: "POST",
			description: "Criar um novo tipo de seção.",
			group: "Tipos de Seções",
		},
		{
			path: "/sections/types/:id",
			method: "GET",
			description: "Obter detalhes de um tipo de seção pelo ID.",
			group: "Tipos de Seções",
		},
		{
			path: "/sections/types/:id/edit",
			method: "PATCH",
			description: "Editar os detalhes de um tipo de seção.",
			group: "Tipos de Seções",
		},
		{
			path: "/sections/types/:id/delete",
			method: "DELETE",
			description: "Deletar um tipo de seção pelo ID.",
			group: "Tipos de Seções",
		},
		{
			path: "/suppliers",
			method: "GET",
			description: "Obter uma lista paginada de fornecedores.",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/new",
			method: "POST",
			description: "Criar um novo fornecedor.",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/:id",
			method: "GET",
			description: "Obter detalhes de um fornecedor pelo ID.",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/:id/edit",
			method: "PATCH",
			description: "Editar os detalhes de um fornecedor.",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/:id/status",
			method: "PUT",
			description: "Atualizar o status de um fornecedor.",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/:id/delete",
			method: "DELETE",
			description: "Deleta um fornecedor.",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/:supplierId",
			method: "GET",
			description: "Obter detalhes de um fornecedor pelo ID.",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/:supplierId/addresses",
			method: "GET",
			description: "Obter os endereços de um fornecedor",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/:supplierId/addresses/new",
			method: "POST",
			description: "Cadastrar um novo endereço do fornecedor",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/:supplierId/addresses/:addressId",
			method: "GET",
			description: "Buscar um endereço do fornecedor por id",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/:supplierId/addresses/:addressId/edit",
			method: "PATCH",
			description: "Editar um novo endereço do fornecedor",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/:supplierId/addresses/:addressId/delete",
			method: "DELETE",
			description: "Deletar um novo endereço do fornecedor",
			group: "Fornecedores",
		},
		{
			path: "/suppliers/:supplierId/products",
			method: "GET",
			description: "Obter uma lista de produtos de um fornecedor.",
			group: "Produtos",
		},
	]
	for (const route of routes) {
		const r = await prisma.routes.findFirst({
			where: {
				path: route.path,
			},
		})
		if (!r) {
			await prisma.routes.create({
				data: {
					path: route.path,
					method: route.method,
					description: route.description,
					group: route.group,
				},
			})
		} else {
			await prisma.routes.update({
				where: { id: r.id },
				data: {
					path: route.path,
					method: route.method,
					description: route.description,
					group: route.group,
				},
			})
		}
	}
	const rts = await prisma.routes.findMany()
	console.log("Seed ok")
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
