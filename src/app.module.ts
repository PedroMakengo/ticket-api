import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { InscricaoModule } from './inscricao/inscricao.module';
import { EventoModule } from './evento/evento.module';
import { AuthModule } from './auth/auth.module';
import { MailService } from './shared/mail/mail.service';
import { MailModule } from './shared/mail/mail.module';

@Module({
  imports: [
    AuthModule,
    EventoModule,
    InscricaoModule,
    TicketModule,
    UserModule,
    PrismaModule,
    MailModule,
  ],
  providers: [MailService],
})
export class AppModule {}
