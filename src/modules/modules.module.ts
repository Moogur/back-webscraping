import { Module } from '@nestjs/common';

import { ParserModule } from './parser';

@Module({
  imports: [ParserModule],
})
export class ModulesModule {}
