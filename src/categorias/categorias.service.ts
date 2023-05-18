import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
  ) {}

  async consultarTodasCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaModel.find().exec();
  }

  async consultarCategoriaPeloId(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    if (!categoriaEncontrada) {
      throw new NotFoundException(
        `A Categoria: ${categoria} nao foi encontrada`,
      );
    }
    return categoriaEncontrada;
  }

  async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    if (categoriaEncontrada) {
      throw new BadRequestException(
        `A categoria ${categoria} ja esta cadastrada`,
      );
    }
    const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
    return await categoriaCriada.save();
  }

  async atualizarCategoria(
    categoria: string,
    atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<void> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    if (!categoriaEncontrada) {
      throw new NotFoundException(
        `A Categoria: ${categoria} nao foi encontrada`,
      );
    }
    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto })
      .exec();
  }
}
