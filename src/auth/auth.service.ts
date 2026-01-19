import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly jwtService: JwtService;

  async signin(dto: CreateAuthDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await bcrypt.compare(dto.senha, user.senha);

    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id };

    return { access_token: await this.jwtService.sign(payload) };
  }

  async validate(otp: string, token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        verifyToken: token,
      },
    });

    if (!user) throw new NotFoundException('Token passado não é válido');

    await this.prisma.user.update({
      where: { id: user.id, codigoOTP: otp },
      data: { verifyToken: 'null', activo: true, codigoOTP: null },
    });

    return user;
  }
}
