export interface BaseScrabConfig {
  url: string;
  baseSelector: string;
  paginationSelector?: string;
  countPage?: number;
  fileName?: string;
  initPage?: number;
  multiplePrefixUrl?: string;
}
