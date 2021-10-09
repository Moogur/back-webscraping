import { AxiosResponse } from 'axios';

export type RequestData<T> = AxiosResponse<T>['data'];

export interface ResponseApiError {
  code?: string;
  status?: number;
  statusText: string;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  data: any;
}
