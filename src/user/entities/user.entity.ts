import { User as Users } from '@prisma/client';

export class User implements Users {
  id: string;
  nome: string;
  email: string;
  senha: string;
  role: string;
  activo: boolean;
  verifyToken: string;
  codigoOTP: string | null;
  expiracaoOTP: Date | null;
  criadoEm: Date;
  atualizadoEm: Date;
}
