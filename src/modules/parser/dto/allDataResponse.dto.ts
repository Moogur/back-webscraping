import { IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AllDataResponse } from '../interfaces';

export class AllDataResponseDto implements AllDataResponse {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiPropertyOptional()
  @IsString()
  readonly url?: string;

  @ApiProperty()
  @IsString()
  readonly description: string;
}
