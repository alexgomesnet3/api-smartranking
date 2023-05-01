import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    telefoneCelular: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    nome: {
      type: String,
    },
    ranking: {
      type: String,
    },
    posicaoRanking: {
      type: Number,
    },
    urlFotoJogador: {
      type: String,
    },
  },
  { timestamp: true, collection: 'jogadores' },
);
