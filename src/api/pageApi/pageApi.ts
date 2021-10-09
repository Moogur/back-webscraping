import { AxiosRequestConfig } from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';
import { getRandom } from 'random-useragent';

import { RequestData, USER_AGENT } from '../../common';
import { BaseApi } from '../baseApi';

export class PageApi extends BaseApi {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public getHtmlPage(url: string, config?: AxiosRequestConfig): Promise<RequestData<string>> {
    return this.request<string>({
      ...config,
      method: 'get',
      url,
      headers: {
        ...config?.headers,
        'user-agent': getRandom() ?? USER_AGENT,
      },
    });
  }

  public async getContent(url: string, config?: AxiosRequestConfig): Promise<CheerioAPI> {
    try {
      const html = await this.getHtmlPage(url, config);
      if (typeof html !== 'string') throw new Error(JSON.stringify(html));
      return cheerio.load(html, { decodeEntities: false });
    } catch (error) {
      console.log(error);
      throw new Error('Error when requesting a page');
    }
  }
}
