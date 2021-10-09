import { IsInt, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BaseScrabConfig } from '../interfaces';

export class BaseScrabConfigDto implements BaseScrabConfig {
  @ApiProperty()
  @IsString()
  readonly url: string;

  @ApiProperty()
  @IsString()
  readonly baseSelector: string;

  @ApiPropertyOptional()
  @IsString()
  readonly paginationSelector?: string;

  @ApiPropertyOptional()
  @IsInt()
  readonly countPage?: number;

  @ApiPropertyOptional()
  @IsString()
  readonly fileName?: string;

  @ApiPropertyOptional()
  @IsInt()
  readonly initPage?: number;

  @ApiPropertyOptional()
  @IsString()
  readonly multiplePrefixUrl?: string;
}
