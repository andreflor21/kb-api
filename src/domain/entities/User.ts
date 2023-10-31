class User {
    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public senha: string,
        public cpf: string | null,
        public ativo: boolean,
        public dtNascimento: Date | null,
        public dtCadastro: Date,
        public tokenReset: string | null | undefined,
        public tokenResetExpires: Date | null | undefined,
        public trocaSenha: boolean,
        public perfilId: string
    ) {}
}

export { User };
