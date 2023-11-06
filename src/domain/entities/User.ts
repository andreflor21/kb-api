class User {
  constructor(
    public nome: string,
    public email: string,
    public senha: string,
    public dtCadastro: string,
    public perfilId: string,
    public id?: string,
    public cpf?: string | null,
    public ativo?: boolean,
    public dtNascimento?: string | null,
    public tokenReset?: string | null | undefined,
    public tokenResetExpires?: string | null | undefined,
    public trocaSenha?: boolean
  ) {}
}

export { User }
