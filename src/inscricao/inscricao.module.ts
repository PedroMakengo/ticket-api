import { Module } from '@nestjs/common';
import { InscricaoService } from './inscricao.service';
import { InscricaoController } from './inscricao.controller';

@Module({
  controllers: [InscricaoController],
  providers: [InscricaoService],
})
export class InscricaoModule {}
