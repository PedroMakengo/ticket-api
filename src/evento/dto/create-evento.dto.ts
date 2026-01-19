export class CreateEventoDto {
  titulo: string;
  descricao: string | null;
  data: Date;
  local: string;
  capacidade: number;
  userId: string;
}
