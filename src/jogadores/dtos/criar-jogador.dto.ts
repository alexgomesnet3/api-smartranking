import { IsEAN, IsNotEmpty } from 'class-validator';

export class CriarJogadorDto {
  @IsNotEmpty()
  readonly telefoneCelular: string;
  @IsEAN()
  readonly email: string;
  @IsNotEmpty()
  readonly nome: string;
}
