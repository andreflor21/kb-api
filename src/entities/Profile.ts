import type { Route } from "./Route"
import type { User } from "./User"

class Profile {
	constructor(
		public id: string,
		public descricao: string,
		public usuarios: User[],
		public rotas: Route[],
	) {}
}

export { Profile }
