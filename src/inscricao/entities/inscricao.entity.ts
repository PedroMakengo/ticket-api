import { Inscricao as Inscricoes } from '@prisma/client';

export class Inscricao implements Inscricoes {
  id: string;
  nomeParticipante: string;
  tipoParticipante: string;
  email: string;
  telefone: string | null;
  eventoId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}
