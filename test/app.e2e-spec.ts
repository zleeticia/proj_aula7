import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { Transacao } from '../src/transacao/schemas/transacao.schema';
import { TransacoesService } from '../src/transacoes/transacoes.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getConnectionToken())
      .useValue({ close: jest.fn().mockResolvedValue(undefined) })
      .overrideProvider(getModelToken(Transacao.name))
      .useValue({})
      .overrideProvider(TransacoesService)
      .useValue({
        getHistorico: jest.fn().mockResolvedValue({
          historico: [],
          metricas: {
            totalTransacoes: 0,
            totalReceitas: 0,
            totalDespesas: 0,
            saldo: 0,
            despesasConscientes: 0,
            despesasImpulsivas: 0,
          },
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/transacoes (GET)', () => {
    return request(app.getHttpServer())
      .get('/transacoes')
      .expect(200)
      .expect({
        historico: [],
        metricas: {
          totalTransacoes: 0,
          totalReceitas: 0,
          totalDespesas: 0,
          saldo: 0,
          despesasConscientes: 0,
          despesasImpulsivas: 0,
        },
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
