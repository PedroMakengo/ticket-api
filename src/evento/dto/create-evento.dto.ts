export class CreateEventoDto {
  titulo: string;
  descricao: string | null;
  data: Date;
  local: string;
  capacidade: number;
  horaInicio: string;
  horaFim: string;
  userId: string;
}
