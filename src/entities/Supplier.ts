import { AddressType } from './types/Address'

class Supplier {
  constructor(
    public id: string,
    public codigo: string,
    public codigoERP: string,
    public nome: string,
    public cnpj: string,
    public usuarioId: string | null,
    public fone: string | null,
    public email: string | null,
    public ativo: boolean,
    public dtCadastro: string | Date,
    public enderecos: SupplierAddress[]
  ) {}
}

class SupplierAddress {
  constructor(
    public id: string,
    public lograd: string,
    public numero: string,
    public complemento: string | null,
    public bairro: string,
    public cidade: string,
    public uf: string,
    public cep: string,
    public fornecedorId: string,
    public tipoEnderecoId: string | null,
    public tipoEndereco: AddressType
  ) {}
}

export { Supplier, SupplierAddress }
