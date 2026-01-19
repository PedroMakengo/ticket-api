export class CreateInscricaoDto {
  nomeParticipante: string;
  tipoParticipante: string;
  email: string;
  telefone: string | null;
  eventoId: string;
}
