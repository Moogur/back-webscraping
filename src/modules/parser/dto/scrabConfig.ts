import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { ScrabConfig } from '../interfaces';

import { BaseScrabConfigDto } from './baseScrabConfig.dto';

export class ScrabConfigDto extends BaseScrabConfigDto implements ScrabConfig {
  @ApiPropertyOptional()
  @IsString()
  titleSelector?: string;

  @ApiPropertyOptional()
  @IsString()
  urlSelector?: string;

  @ApiPropertyOptional()
  @IsString()
  descriptionSelector?: string;
}
