import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInscricaoDto } from './dto/create-inscricao.dto';
import { UpdateInscricaoDto } from './dto/update-inscricao.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { MailService } from 'src/shared/mail/mail.service';
import {
  generateTicketPDF,
  type TicketData,
} from 'src/utils/ticket-pdf.generator';

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

    const ticketData: TicketData = {
      eventName: 'A Grande Gala 2024',
      location: 'Metropolitan Museum of Art',
      date: 'Sexta, 15 Dez',
      time: '19:00 - 23:30',
      participantName: 'Alex Johnson',
      participantType: 'Membro Profissional',
      seatType: 'Entrada Geral',
      seatDetails: 'Fila B | Lugar 24',
      ticketId: '#EH-2024-8849',
      orderRef: 'GH921',
      baseUrl: 'localhost:3000/validate-ticket?ticketId=...',
    };

    const pdfPath = await generateTicketPDF(ticketData);
  }

  async findAll() {
    return `This action returns all inscricao`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} inscricao`;
  }

  async update(id: string, updateInscricaoDto: UpdateInscricaoDto) {
    return `This action updates a #${id} inscricao`;
  }

  async remove(id: string) {
    return `This action removes a #${id} inscricao`;
  }
}
