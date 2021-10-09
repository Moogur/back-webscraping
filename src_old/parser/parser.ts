import { Cheerio, CheerioAPI, Node } from 'cheerio';

import { GetAllDataPropsType, SaveDataType, DataType, ParserPaginationType } from '../types';
import { REPLACE_URL_SYMBOLS } from '../utils';

export class Parser {
  public parseTitles(data: CheerioAPI, selector: string): SaveDataType {
    return this.helperForGetContent(data, selector, (elem) => elem.text());
  }

  public parseLinks(data: CheerioAPI, selector: string): SaveDataType {
    return this.helperForGetContent(data, selector, (elem) => elem.attr('href'));
  }

  public parseAllData(data: CheerioAPI, selectors: GetAllDataPropsType): SaveDataType {
    return this.helperForGetContent(data, selectors.baseSelector, (elem) => ({
      title: elem.find(selectors.titleSelector).text(),
      url: elem.find(selectors.urlSelector).attr('href'),
      description: elem.find(selectors.descriptionSelector).text(),
    }));
  }

  public getCountPageAndBaseUrl(data: CheerioAPI, selector: string): ParserPaginationType {
    try {
      let lastItem: ParserPaginationType;
      data(selector).each((_, elem) => {
        const count = data(elem).text();
        if (!Number.isNaN(Number(count))) {
          const url = data(elem).attr('href');
          lastItem = { count: Number(count), url: url?.replace(count, REPLACE_URL_SYMBOLS) };
        }
      });
      return lastItem;
    } catch {
      throw new Error('error');
    }
  }

  private helperForGetContent(
    data: CheerioAPI,
    selector: string,
    callback: (elem: Cheerio<Node>) => string | undefined | DataType,
  ): SaveDataType {
    try {
      return data(selector)
        .map((_, elem) => callback(data(elem)))
        .toArray()
        .filter(Boolean);
    } catch {
      throw new Error('error');
    }
  }
}
