class Route {
  constructor(
    public id: string,
    public descricao: string,
    public caminho: string,
    public metodo: string | null
  ) {}
}

export { Route }
