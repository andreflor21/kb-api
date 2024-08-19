class User {
  constructor(
    public nome: string,
    public email: string,
    public senha: string,
    public dtCadastro: string | Date,
    public perfilId: string,
    public id?: string,
    public cpf?: string | null,
    public ativo?: boolean,
    public dtNascimento?: string | Date | null,
    public tokenReset?: string | null | undefined,
    public tokenResetExpires?: string | Date | null | undefined,
    public trocaSenha?: boolean
  ) {}
}

export { User }
