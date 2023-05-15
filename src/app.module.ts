import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriasService } from './categorias/categorias.service';
import { CategoriasModule } from './categorias/categorias.module';
import { CategoriasController } from './categorias/categorias.controller';
import { CategoriasService } from './categorias/categorias.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`, {}),
    JogadoresModule,
    CategoriasModule,
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class AppModule {}
