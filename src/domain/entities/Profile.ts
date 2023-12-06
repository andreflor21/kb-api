import { User } from './User'
import { Route } from './Route'

class Profile {
  constructor(
    public id: string,
    public descricao: string,
    public usuarios: User[],
    public rotas: Route[]
  ) {}
}

export { Profile }
