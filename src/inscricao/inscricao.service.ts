import { Injectable } from '@nestjs/common';
import { CreateInscricaoDto } from './dto/create-inscricao.dto';
import { UpdateInscricaoDto } from './dto/update-inscricao.dto';

@Injectable()
export class InscricaoService {
  create(createInscricaoDto: CreateInscricaoDto) {
    return 'This action adds a new inscricao';
  }

  findAll() {
    return `This action returns all inscricao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inscricao`;
  }

  update(id: number, updateInscricaoDto: UpdateInscricaoDto) {
    return `This action updates a #${id} inscricao`;
  }

  remove(id: number) {
    return `This action removes a #${id} inscricao`;
  }
}
