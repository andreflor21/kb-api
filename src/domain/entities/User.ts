class User {
    constructor(
        public id: number,
        public nome: string,
        public email: string,
        public senha: string,
        public cpf: string,
        public ativo: boolean,
        public dtNascimento: Date,
        public dtCadastro: Date,
        public tokenReset: string | undefined,
        public tokenResetExpires: Date | undefined,
        public trocaSenha: boolean,
        public perfilId: number
    ) {}
}

export { User };
