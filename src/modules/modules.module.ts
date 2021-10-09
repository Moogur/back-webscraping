import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ParserModule } from './parser';

@Module({
  imports: [ConfigModule.forRoot(), ParserModule],
})
export class ModulesModule {}
