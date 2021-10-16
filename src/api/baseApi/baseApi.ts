import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getRandom } from 'random-useragent';

import { RequestData, ResponseApiError, USER_AGENT } from '../../common';

export abstract class BaseApi {
  private readonly axiosInstance: AxiosInstance;

  protected constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  protected request<T>(options: AxiosRequestConfig): Promise<RequestData<T>> {
    return this.axiosInstance
      .request({ ...options, headers: { ...options.headers, 'user-agent': getRandom() ?? USER_AGENT } })
      .then(
        (response) => response.data,
        (error) => BaseApi.formatError(error),
      );
  }

  private static formatError(error: AxiosError): ResponseApiError {
    return {
      code: error?.code,
      status: error?.response?.status,
      statusText: error?.response?.statusText || 'Unknown error',
      data: error?.response?.data || {},
    };
  }
}
