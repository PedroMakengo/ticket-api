import {
  Inject,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class EventoService {
  @Inject()
  private readonly prisma: PrismaService;

  @UseGuards(AuthGuard)
  async create(createEventoDto: CreateEventoDto) {
    const evento = await this.prisma.evento.create({
      data: createEventoDto,
    });

    return evento;
  }

  async findAll() {
    return await this.prisma.evento.findMany();
  }

  async findOne(id: string) {
    const evento = await this.prisma.evento.findUnique({
      where: { id },
    });

    if (!evento) throw new NotFoundException('Evento not found');

    return evento;
  }

  @UseGuards(AuthGuard)
  async update(id: string, updateEventoDto: UpdateEventoDto) {
    const eventoExists = await this.prisma.evento.findUnique({
      where: { id },
    });

    if (!eventoExists) throw new NotFoundException('Evento not found');

    const evento = this.prisma.evento.update({
      where: { id },
      data: updateEventoDto,
    });

    return evento;
  }

  @UseGuards(AuthGuard)
  async remove(id: string) {
    const eventoExists = await this.prisma.evento.findUnique({
      where: { id },
    });

    if (!eventoExists) throw new NotFoundException('Evento not found');

    const evento = this.prisma.evento.delete({
      where: { id },
    });

    return evento;
  }
}
