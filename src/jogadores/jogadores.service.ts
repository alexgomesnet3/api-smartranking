import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
//import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;
    /* const jogadorEncontrado: Jogador = this.jogadores.find(
      (jogador) => jogador.email === email,
    ); */
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (jogadorEncontrado) {
      await this.atualizar(criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
    //return await this.jogadores;
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    /* const jogadorEncontrado: Jogador = this.jogadores.find(
      (jogador) => jogador.email === email,
    ); */
    const jogadorEncontrado: Jogador = await this.jogadorModel
      .findOne({ email })
      .exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com email ${email} nao foi encontrado`,
      );
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<any> {
    //return await this.jogadorModel.remove({ email }).exec();
    return await this.jogadorModel.deleteOne({ email }).exec();
    /* const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    ); */
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
    /* const { nome, telefoneCelular, email } = criarJogadorDto;
    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador:
        'https://images.unsplash.com/photo-1605395630162-1c7cc7a34590?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVubmlzJTIwcGxheWVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
    };
    this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador); */
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();
    /* const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome; */
  }
}
