import { IUserRepository } from './IUserRepository';
import { User } from '../entities/User';
import { v4 as uuid } from 'uuid';
import { AuthService } from '../http/services/AuthService';
class FakeUserRepository implements IUserRepository {
    private users: User[] = [];

    public async deleteUser(id: string): Promise<void> {
        this.users = this.users.filter((user) => user.id != id);
    }

    public async getUsers(): Promise<User[]> {
        return this.users;
    }

    public async getUserById(id: string): Promise<User | null> {
        const findUser = this.users.find((user) => user.id === id);

        return findUser ? findUser : null;
    }
    public async getUserByToken(token: string): Promise<User | null> {
        const findUser = this.users.find((user) => user.tokenReset === token);

        return findUser ? findUser : null;
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const findUser = this.users.find((user) => user.email === email);

        return findUser ? findUser : null;
    }

    public async updateUser(id: string, user: User): Promise<User | null> {
        const findUser = this.users.find((user) => user.id === id);

        if (findUser) {
            findUser.email = user.email ? user.email : findUser.email;
            findUser.nome = user.nome ? user.nome : findUser.nome;
            findUser.cpf = user.cpf ? user.cpf : findUser.cpf;
            findUser.dtNascimento = user.dtNascimento
                ? user.dtNascimento
                : findUser.dtNascimento;
            findUser.ativo = user.ativo ? user.ativo : findUser.ativo;
            findUser.perfilId = user.perfilId
                ? user.perfilId
                : findUser.perfilId;

            this.users[this.users.map((x) => x.id).indexOf(id)] = findUser;

            return findUser;
        } else {
            return null;
        }
    }

    public async createUser(user: User): Promise<User> {
        const newUser = new User();
        const authService = new AuthService(this, '');

        const hashedpassword = authService.hashPassword(user.senha);
        Object.assign(newUser, {
            id: uuid(),
            nome: user.nome,
            email: user.email,
            senha: hashedpassword,
            cpf: user.cpf,
        });

        this.users.push(user);

        return newUser;
    }

    public async recoverPassword(
        token: string,
        password: string
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async changePassword(id: string, password: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async updateToken(
        id: string,
        token: string,
        date: Date
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export { FakeUserRepository };
