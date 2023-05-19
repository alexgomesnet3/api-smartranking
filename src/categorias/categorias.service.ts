import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria.interface';
//import { Jogador } from '../jogadores/interfaces/jogador.interface';
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

  async atribuirCategoriaJogador(params: string[]): Promise<void> {
    const categoria = params['categoria'];
    const idJogador = params['idJogador'];

    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    if (!categoriaEncontrada) {
      throw new NotFoundException(
        `A Categoria: ${categoria} nao foi encontrada`,
      );
    }

    categoriaEncontrada.jogadores.push(idJogador);
    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: categoriaEncontrada })
      .exec();

    /* const idJogadorEncontrado = await this.jogadorModel
      .findOne({ idJogador })
      .exec();
    if (!idJogadorEncontrado) {
      throw new NotFoundException(
        `O jogador com o ${idJogador} nao existe no sistema.`,
      );
    } */
  }
}
