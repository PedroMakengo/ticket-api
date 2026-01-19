export class CreateUserDto {
  nome: string;
  email: string;
  senha: string;
  role: string;
  activo: boolean;
  verifyToken: string;
  codigoOTP: string;
}
