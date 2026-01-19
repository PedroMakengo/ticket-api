import { Module } from '@nestjs/common';
import { InscricaoService } from './inscricao.service';
import { InscricaoController } from './inscricao.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/shared/mail/mail.module';

@Module({
  controllers: [InscricaoController],
  providers: [InscricaoService],
  imports: [PrismaModule, AuthModule, MailModule],
})
export class InscricaoModule {}
