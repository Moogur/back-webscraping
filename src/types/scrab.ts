export interface BaseScrabConfig {
  baseSelector: string;
  paginationSelector?: string;
  countPage?: number;
  fileName?: string;
  initPage?: number;
  multiplePrefixUrl?: string;
}

export interface ScrabConfig extends BaseScrabConfig {
  titleSelector?: string;
  urlSelector?: string;
  descriptionSelector?: string;
}
