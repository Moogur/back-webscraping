import { BaseScrabConfig } from './baseScrabConfig.interface';

export interface ScrabConfig extends BaseScrabConfig {
  titleSelector?: string;
  urlSelector?: string;
  descriptionSelector?: string;
}
