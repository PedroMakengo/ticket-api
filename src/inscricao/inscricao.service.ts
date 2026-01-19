import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInscricaoDto } from './dto/create-inscricao.dto';
import { UpdateInscricaoDto } from './dto/update-inscricao.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { MailService } from 'src/shared/mail/mail.service';

@Injectable()
export class InscricaoService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly mail: MailService;

  async create(createInscricaoDto: CreateInscricaoDto) {
    const inscricaoExistente = await this.prisma.inscricao.findFirst({
      where: {
        email: createInscricaoDto.email,
        eventoId: createInscricaoDto.eventoId,
      },
    });

    if (inscricaoExistente)
      throw new NotFoundException(
        'Já tens uma inscrição efetuada para este evento',
      );

    const inscricao = await this.prisma.inscricao.create({
      data: createInscricaoDto,
    });

    return inscricao;
  }

  async findAll() {
    return await this.prisma.inscricao.findMany();
  }

  async findOne(id: string) {
    const inscricao = await this.prisma.inscricao.findUnique({
      where: { id },
    });

    return inscricao;
  }

  async update(id: string, updateInscricaoDto: UpdateInscricaoDto) {
    const inscricao = await this.prisma.inscricao.update({
      where: {
        id,
      },
      data: updateInscricaoDto,
    });

    return inscricao;
  }

  async remove(id: string) {
    return await this.prisma.inscricao.delete({
      where: {
        id,
      },
    });
  }
}
