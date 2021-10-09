import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CatsModule } from '../modules/cats/cats.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
