import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FileModule } from './file';
import { ParserModule } from './parser';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: './env/.env' }), ParserModule, FileModule],
})
export class ModulesModule {}
