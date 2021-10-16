import { ReadStream } from 'fs';

import { Injectable } from '@nestjs/common';
import { fileApi } from 'src/api';

@Injectable()
export class FileService {
  public async downloadFile(url: string): Promise<ReadStream> {
    return fileApi.downloadFile(url);
  }
}
