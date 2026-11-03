export type TransacaoTipo = 'receita' | 'despesa';

export class CreateTransacaoDto {
  descricao: string;
  valor: number;
  tipo: TransacaoTipo;
  categoria: string;
  consumoConsciente: boolean;
}
