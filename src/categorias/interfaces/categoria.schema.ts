import * as mongoose from 'mongoose';

export const CategoriaSchema = new mongoose.Schema(
  {
    jogadores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
      },
    ],
    categoria: {
      type: String,
      unique: true,
    },
    descricao: { type: String },
    eventos: [
      {
        nome: { type: String },
        operacao: { type: String },
        valor: { type: String },
      },
    ],
  },
  { timestamps: true, collection: 'categorias' },
);
