import { AxiosRequestConfig } from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';
// import randomUseragent from 'random-useragent';

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
        'user-agent': USER_AGENT,
      },
    });
  }

  public async getContent(url: string, config?: AxiosRequestConfig): Promise<CheerioAPI> {
    try {
      const html = await this.getHtmlPage(url, config);
      return cheerio.load(html, { decodeEntities: false });
    } catch (error) {
      throw error;
    }
  }
}
