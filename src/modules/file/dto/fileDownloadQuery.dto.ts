import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { FileDownloadQuery } from '../interfaces';

export class FileDownloadQueryDto implements FileDownloadQuery {
  @ApiProperty()
  @IsString()
  readonly url: string;
}
