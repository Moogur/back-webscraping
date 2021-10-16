import { ReadStream } from 'fs';

import { AxiosRequestConfig } from 'axios';

import { RequestData } from '../../common';
import { BaseApi } from '../baseApi';

export class FileApi extends BaseApi {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public async downloadFile(url: string, config?: AxiosRequestConfig): Promise<RequestData<ReadStream>> {
    try {
      console.log(url);
      const response = await this.requestHelper(
        'https://downloads.gamulator.com/roms/1986 - Pokemon Emerald (U)(TrashMan).zip',
        config,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('error when uploading a file');
    }
  }

  private requestHelper(url: string, config?: AxiosRequestConfig): Promise<RequestData<ReadStream>> {
    return this.request({
      ...config,
      method: 'get',
      url,
      responseType: 'stream',
    });
  }
}
