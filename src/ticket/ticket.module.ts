import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
  imports: [PrismaModule, AuthModule],
})
export class TicketModule {}
