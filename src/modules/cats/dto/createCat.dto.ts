import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Cat } from '../interfaces/cats.interface';

export class CreateCatDto implements Cat {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsInt()
  readonly age: number;
}
