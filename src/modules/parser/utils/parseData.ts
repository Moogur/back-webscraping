import { Cheerio, CheerioAPI, Node } from 'cheerio';

import { REPLACE_URL_SYMBOLS } from '../../../common';
import { AllDataResponse, Pagination, ScrabConfig } from '../interfaces';

function helperForGetContent<T>(data: CheerioAPI, selector: string, callback: (elem: Cheerio<Node>) => T): T[] {
  try {
    return data(selector)
      .map((_, elem) => callback(data(elem)))
      .toArray();
  } catch (error) {
    throw error;
  }
}

export function parseTitles(data: CheerioAPI, selector: string): string[] {
  return helperForGetContent(data, selector, (elem) => elem.text());
}

export function parseLinks(data: CheerioAPI, selector: string): string[] {
  return helperForGetContent(data, selector, (elem) => {
    return elem.attr('href');
  }).filter((item) => item) as string[];
}

export function parseAllData(
  data: CheerioAPI,
  selectors: Pick<ScrabConfig, 'titleSelector' | 'urlSelector' | 'descriptionSelector' | 'baseSelector'>,
): AllDataResponse[] {
  return helperForGetContent(data, selectors.baseSelector, (elem) => ({
    /* eslint-disable unicorn/no-array-callback-reference*/
    title: elem.find(selectors.titleSelector).text(),
    url: elem.find(selectors.urlSelector).attr('href'),
    description: elem.find(selectors.descriptionSelector).text(),
  }));
}

export function getCountPageAndBaseUrl(data: CheerioAPI, selector: string): Pagination {
  try {
    let lastItem: Pagination | undefined;
    data(selector).each((_, elem) => {
      const count = data(elem).text();
      if (!Number.isNaN(Number(count))) {
        const url = data(elem).attr('href');
        lastItem = { count: Number(count), url: url?.replace(count, REPLACE_URL_SYMBOLS) };
      }
    });

    if (!lastItem) {
      throw new Error('pagination is not found');
    }
    return lastItem;
  } catch (error) {
    throw error;
  }
}
