import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { RequestData, ResponseApiError } from '../../types';

export abstract class BaseApi {
  private readonly axiosInstance: AxiosInstance;

  protected constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  protected request<T>(options: AxiosRequestConfig): Promise<RequestData<T>> {
    return this.axiosInstance.request(options).then(
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
