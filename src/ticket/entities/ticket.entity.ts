import { Ticket as Tickets } from '@prisma/client';

export class Ticket implements Tickets {
  id: string;
  codigo: string;
  status: string;
  eventoId: string;
  inscricaoId: string;
  criadoEm: Date;
  usadoEm: Date | null;
}
