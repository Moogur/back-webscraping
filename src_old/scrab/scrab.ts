import { CheerioAPI } from 'cheerio';
import { pick } from 'lodash';

import { pageApi } from '../api';
import { parser } from '../parser';
import { saveData } from '../saveData';
import { ParserPaginationType, SaveDataType } from '../types';
import { BaseScrabConfig, ScrabConfig } from '../types/scrab';
import { REPLACE_URL_SYMBOLS, getNormalUrl, sleep, getRandomNumber } from '../utils';

export class Scrab {
  public saveLinksToJSON(url: string, config: BaseScrabConfig): void {
    this.helperForScrabingData(url, (data) => parser.parseLinks(data, config.baseSelector), config);
  }

  public saveTitlesToJSON(url: string, config: BaseScrabConfig): void {
    this.helperForScrabingData(url, (data) => parser.parseTitles(data, config.baseSelector), config);
  }

  public saveAllDataToJSON(url: string, config: ScrabConfig): void {
    const selectors = pick(config, ['titleSelector', 'urlSelector', 'descriptionSelector', 'baseSelector']);
    this.helperForScrabingData(url, (data) => parser.parseAllData(data, selectors), config);
  }

  private async helperForScrabingData(
    url: string,
    callback: (data: CheerioAPI) => SaveDataType,
    config: BaseScrabConfig,
  ): Promise<void> {
    const data = [];
    try {
      const response = await pageApi.getContent(url);
      data.push(...callback(response));

      if (config.paginationSelector) {
        const pagination = parser.getCountPageAndBaseUrl(response, config.paginationSelector);
        const promises = this.helperForMultipleData(config, callback, data, pagination);
        await Promise.all(promises);
      }
    } catch {}
    saveData.toJSON(data, config.fileName);
  }

  private helperForMultipleData(
    config: BaseScrabConfig,
    callback: (data: CheerioAPI) => SaveDataType,
    data: SaveDataType,
    pagination: ParserPaginationType,
  ): Array<Promise<void>> {
    const from = Number(config.initPage) + 1 || 2;
    const to = Number(config.countPage) - 1 || pagination?.count || 0;

    const promises = Array.from({ length: to }, (_, i) => i + from).map(async (item): Promise<void> => {
      sleep(getRandomNumber(500, 1000));
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
