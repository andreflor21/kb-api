import type { SectionType } from "./types/Section"

class Section {
	constructor(
		public id: string,
		public descricao: string,
		public codigo: string,
		public codigoMatrizFilial: string,
		public codigoERP: string | null,
		public tipoSecaoId: string,
		public ativo: boolean,
		public tipoSecao: SectionType,
	) {}
}
