import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  controllers: [EventoController],
  providers: [EventoService],
  imports: [AuthModule, PrismaModule],
})
export class EventoModule {}
