import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailModule } from 'src/shared/mail/mail.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MailModule, PrismaModule, JwtModule],
})
export class UserModule {}
