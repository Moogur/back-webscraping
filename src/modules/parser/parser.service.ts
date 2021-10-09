import { Injectable } from '@nestjs/common';
import { CheerioAPI } from 'cheerio';
import { pick } from 'lodash';
import { pageApi } from 'src/api';
import { getNormalUrl, getRandomNumber, REPLACE_URL_SYMBOLS, sleep } from 'src/common';

import { AllDataResponse, BaseScrabConfig, Pagination, ScrabConfig } from './interfaces';
import { getCountPageAndBaseUrl, parseAllData, parseLinks, parseTitles } from './utils';

@Injectable()
export class ParserService {
  public async getLinks(config: BaseScrabConfig): Promise<string[]> {
    return this.helperForScrabingData((data) => parseLinks(data, config.baseSelector), config);
  }

  public getTitles(config: BaseScrabConfig): Promise<string[]> {
    return this.helperForScrabingData((data) => parseTitles(data, config.baseSelector), config);
  }

  public getData(config: ScrabConfig): Promise<AllDataResponse[]> {
    const selectors = pick(config, ['titleSelector', 'urlSelector', 'descriptionSelector', 'baseSelector']);
    return this.helperForScrabingData((data) => parseAllData(data, selectors), config);
  }

  private async helperForScrabingData<T>(callback: (data: CheerioAPI) => T[], config: BaseScrabConfig): Promise<T[]> {
    const data = [];
    const response = await pageApi.getContent(config.url);
    data.push(...callback(response));

    if (config.paginationSelector) {
      const pagination = getCountPageAndBaseUrl(response, config.paginationSelector);
      const promises = this.helperForMultipleData(config, callback, data, pagination);
      await Promise.all(promises);
    }

    return data;
  }

  private helperForMultipleData<T>(
    config: BaseScrabConfig,
    callback: (data: CheerioAPI) => T[],
    data: T[],
    pagination: Pagination,
  ): Array<Promise<void>> {
    const from = Number(config.initPage) + 1 || 2;
    const to = Number(config.countPage) - 1 || pagination?.count || 0;

    const promises = Array.from({ length: to }, (_, i) => i + from).map(async (item): Promise<void> => {
      sleep(getRandomNumber(Number(process.env['SLEEP_FROM']), Number(process.env['SLEEP_TO'])));
      const newUrl = getNormalUrl(
        pagination?.url?.replace(REPLACE_URL_SYMBOLS, item.toString()),
        config.multiplePrefixUrl,
      );
      if (!newUrl) return;

      const newResponse = await pageApi.getContent(newUrl);
      data.push(...callback(newResponse));
    });

    return promises;
  }
}
