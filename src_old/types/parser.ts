import { ScrabConfig } from './scrab';

export interface DataType {
  title: string;
  url?: string;
  description: string;
}

export type GetAllDataPropsType = Pick<
  ScrabConfig,
  'baseSelector' | 'titleSelector' | 'urlSelector' | 'descriptionSelector'
>;

export type ParserPaginationType = { count: number; url?: string } | undefined;
