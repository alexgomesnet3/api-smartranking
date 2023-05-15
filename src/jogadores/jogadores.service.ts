import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { json } from 'stream/consumers';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}
  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (jogadorEncontrado) {
      throw new BadRequestException(
        `O jogador ja tem o e-mail ${email} cadastrado no sistema.`,
      );
    } else {
      const jogadorCriado = new this.jogadorModel(criarJogadorDto);
      return await jogadorCriado.save();
    }
  }

  async atualizarJogador(
    _id: string,
    criarJogadorDto: CriarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `O jogador com o ${_id} nao existe no sistema.`,
      );
    }
    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: criarJogadorDto })
      .exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado: Jogador = await this.jogadorModel
      .findOne({ _id })
      .exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} nao foi encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `O jogador com o ${_id} nao existe no sistema.`,
      );
    }
    return await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
