import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InscricaoService } from './inscricao.service';
import { CreateInscricaoDto } from './dto/create-inscricao.dto';
import { UpdateInscricaoDto } from './dto/update-inscricao.dto';

@Controller('inscricao')
export class InscricaoController {
  constructor(private readonly inscricaoService: InscricaoService) {}

  @Post()
  create(@Body() createInscricaoDto: CreateInscricaoDto) {
    return this.inscricaoService.create(createInscricaoDto);
  }

  @Get()
  findAll() {
    return this.inscricaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inscricaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInscricaoDto: UpdateInscricaoDto) {
    return this.inscricaoService.update(+id, updateInscricaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inscricaoService.remove(+id);
  }
}
