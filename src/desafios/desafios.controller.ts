import { Controller, Post } from '@nestjs/common';
import { CriarCategoriaDto } from 'src/categorias/dtos/criar-categoria.dto';
import { Desafio } from './interfaces/desafio.interface';

@Controller('desafios')
export class DesafiosController {
  @Post()
  async criarDesafio(criarDesafioDto: CriarCategoriaDto): Promise<Desafio> {
    return await criarDesafio(criarDesafioDto);
  }
}
