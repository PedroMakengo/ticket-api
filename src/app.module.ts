import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { InscricaoModule } from './inscricao/inscricao.module';
import { EventoModule } from './evento/evento.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    EventoModule,
    InscricaoModule,
    TicketModule,
    UserModule,
    DatabaseModule,
  ],
})
export class AppModule {}
