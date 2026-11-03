import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { TransacaoTipo } from '../dto/create-transacao.dto';

@Schema()
export class Transacao {
  @Prop({ required: true, type: String })
  descricao: string;

  @Prop({ required: true, type: Number })
  valor: number;

  @Prop({ required: true, enum: ['receita', 'despesa'], type: String })
  tipo: TransacaoTipo;

  @Prop({ required: true, type: String })
  categoria: string;

  @Prop({ required: true, type: Boolean })
  consumoConsciente: boolean;
}

export const TransacaoSchema = SchemaFactory.createForClass(Transacao);
