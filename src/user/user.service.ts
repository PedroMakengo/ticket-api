import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { MailService } from 'src/shared/mail/mail.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly mailService: MailService;

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.senha, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const token = randomUUID();

    const user = this.prisma.user.create({
      data: {
        ...createUserDto,
        senha: hashPassword,
        codigoOTP: otp,
        verifyToken: token,
        expiracaoOTP: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      },
    });

    await this.mailService.sendMail(createUserDto.email, otp, token);

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
