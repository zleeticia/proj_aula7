import { Controller, Get } from '@nestjs/common';
import {
  TransacoesService,
  type TransacaoHistorico,
} from './transacoes.service';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Get()
  getHistorico(): Promise<TransacaoHistorico> {
    return this.transacoesService.getHistorico();
  }
}
