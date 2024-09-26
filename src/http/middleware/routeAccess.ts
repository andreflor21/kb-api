import { makeGetUserByIdUseCase } from "@/use-cases/factories/user/make-get-user-by-id-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function verifyRouteAccess(
	req: FastifyRequest,
	res: FastifyReply,
) {
	try {
		// Verifique e decodifique o JWT para obter o ID do usuário
		await req.jwtVerify() // Verifica e decodifica o JWT
		const { id } = req.user // Pega o "sub" (ou outro campo do payload)
		const getUserById = makeGetUserByIdUseCase()
		const { user } = await getUserById.execute({ id })
		if (!user || !user.profile) {
			return res
				.status(404)
				.send({ message: "Perfil não encontrado ou inválido." })
		}

		// Obtenha o caminho e o método da rota solicitada
		const { method, url } = req.raw
		// console.log(method, url);
		// console.log(user?.profile?.routes);

		// Função para normalizar a URL e lidar com parâmetros dinâmicos (substituindo :param por [^/]+)
		const normalizeRoute = (routePath: string) =>
			routePath.replace(/:[^\/]+/g, "[^/]+")

		// Verifique se a rota está habilitada no perfil do usuário, considerando parâmetros dinâmicos
		const hasAccess = user.profile.routes?.some((route) => {
			const normalizedRoute = new RegExp(
				`^${normalizeRoute(route.path as string)}$`,
			)
			// console.log(normalizedRoute);
			return (
				normalizedRoute.test(url as string) &&
				route.method === method?.toUpperCase()
			)
		})
		// TODO: Ativar novamente a verificação dos acessos
		// if (!hasAccess) {
		// 	return res.status(403).send({ message: "Acesso negado." })
		// }

		// Caso tenha acesso, prossiga para a próxima função
		return true
	} catch (error) {
		console.error(error)
		return res.status(500).send({ message: "Erro interno do servidor." })
	}
}
