import { Controller, Get, Query, InternalServerErrorException, StreamableFile } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOkResponse } from '@nestjs/swagger';

import { FileService } from './file.service';
import { FileDownloadQueryDto } from './dto';
import { FileDownloadQuery } from './interfaces';

@Controller('file')
@ApiTags('file')
export class FileController {
  constructor(private srv: FileService) {}

  @Get('download')
  @ApiQuery({ type: FileDownloadQueryDto })
  @ApiOkResponse({ type: StreamableFile })
  async downloadFile(@Query() query: FileDownloadQuery): Promise<StreamableFile> {
    try {
      const response = await this.srv.downloadFile(query.url);
      return new StreamableFile(response);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
