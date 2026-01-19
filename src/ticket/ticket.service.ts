import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import {
  generateTicketPDF,
  type TicketData,
} from 'src/utils/ticket-pdf.generator';

@Injectable()
export class TicketService {
  async create(createTicketDto: CreateTicketDto) {
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
    return pdfPath;
  }

  findAll() {
    return `This action returns all ticket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
