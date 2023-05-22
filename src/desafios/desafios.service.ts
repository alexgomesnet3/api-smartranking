import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Desafio } from './interfaces/desafio.interface';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
  ) {}

  async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
    const { solicitante } = criarDesafioDto;
    const desafioEncontrado = await this.desafioModel
      .findOne({ solicitante })
      .exec();
    if (desafioEncontrado) {
      throw new BadRequestException(
        `O jogador ${solicitante} ja tem um desafio cadastrado.`,
      );
    } else {
      const jogadorCriado = new this.desafioModel(criarDesafioDto);
      return await jogadorCriado.save();
    }
  }
}
