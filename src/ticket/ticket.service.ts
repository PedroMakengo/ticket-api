import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import {
  generateTicketPDF,
  type TicketData,
} from 'src/utils/ticket-pdf.generator';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { gerarReferenciaTicket } from 'src/utils/random-codigo-referencia';

@Injectable()
export class TicketService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createTicketDto: CreateTicketDto) {
    const codigoReferencia = gerarReferenciaTicket();

    const ticket = await this.prisma.ticket.create({
      data: {
        ...createTicketDto,
        codigo: codigoReferencia,
      },
    });

    const evento = await this.prisma.evento.findUnique({
      where: {
        id: ticket.eventoId,
      },
    });

    const inscricao = await this.prisma.inscricao.findUnique({
      where: {
        id: ticket.inscricaoId,
      },
    });

    if (!evento) throw new NotFoundException('Este evento não existe');
    if (!inscricao) throw new NotFoundException('Inscrição não efetuada');

    const ticketData: TicketData = {
      eventName: evento?.titulo || '',
      location: evento?.local || '',
      date: `${evento?.data}` || '',
      time: `${evento?.horaInicio} - ${evento?.horaFim}`,
      participantName: inscricao?.nomeParticipante,
      participantType: inscricao?.tipoParticipante,
      seatType: ticket.tipoLugar,
      seatDetails: ticket.tipoLugarDetalhes,
      ticketId: `#${ticket.id}`,
      orderRef: ticket.codigo,
      baseUrl: `'localhost:3000/validate-ticket?ticketId='${ticket.id}`,
    };

    const pdfPath = await generateTicketPDF(ticketData);

    return pdfPath;
  }

  async findAll() {
    return this.prisma.ticket.findMany();
  }

  async findOne(id: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });

    return ticket;
  }

  async remove(id: string) {
    return this.prisma.ticket.delete({ where: { id } });
  }
}
