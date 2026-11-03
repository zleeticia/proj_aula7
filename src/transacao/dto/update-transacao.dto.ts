import type { TransacaoTipo } from './create-transacao.dto';

export class UpdateTransacaoDto {
  descricao?: string;
  valor?: number;
  tipo?: TransacaoTipo;
  categoria?: string;
  consumoConsciente?: boolean;
}
