import { Evento as Eventos } from '@prisma/client';

export class Evento implements Eventos {
  id: string;
  titulo: string;
  descricao: string | null;
  data: Date;
  local: string;
  capacidade: number;
  userId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}
