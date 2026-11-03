import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { HydratedDocument, Model } from 'mongoose';
import { Transacao } from '../transacao/schemas/transacao.schema';

type TransacaoDocument = HydratedDocument<Transacao>;

export interface TransacaoMetricas {
  totalTransacoes: number;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  despesasConscientes: number;
  despesasImpulsivas: number;
}

export interface TransacaoHistorico {
  historico: TransacaoDocument[];
  metricas: TransacaoMetricas;
}

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private readonly transacaoModel: Model<Transacao>,
  ) {}

  async getHistorico(): Promise<TransacaoHistorico> {
    const historico = await this.transacaoModel.find().sort({ _id: -1 }).exec();

    const metricas = historico.reduce<TransacaoMetricas>(
      (totais, transacao) => {
        totais.totalTransacoes += 1;

        if (transacao.tipo === 'receita') {
          totais.totalReceitas += transacao.valor;
        } else {
          totais.totalDespesas += transacao.valor;

          if (transacao.consumoConsciente) {
            totais.despesasConscientes += transacao.valor;
          } else {
            totais.despesasImpulsivas += transacao.valor;
          }
        }

        totais.saldo = totais.totalReceitas - totais.totalDespesas;
        return totais;
      },
      {
        totalTransacoes: 0,
        totalReceitas: 0,
        totalDespesas: 0,
        saldo: 0,
        despesasConscientes: 0,
        despesasImpulsivas: 0,
      },
    );

    return { historico, metricas };
  }
}
