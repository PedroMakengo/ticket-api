import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InscricaoService } from './inscricao.service';
import { CreateInscricaoDto } from './dto/create-inscricao.dto';
import { UpdateInscricaoDto } from './dto/update-inscricao.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('inscricao')
export class InscricaoController {
  constructor(private readonly inscricaoService: InscricaoService) {}

  @Post()
  create(@Body() createInscricaoDto: CreateInscricaoDto) {
    return this.inscricaoService.create(createInscricaoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.inscricaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inscricaoService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInscricaoDto: UpdateInscricaoDto,
  ) {
    return this.inscricaoService.update(id, updateInscricaoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inscricaoService.remove(id);
  }
}
