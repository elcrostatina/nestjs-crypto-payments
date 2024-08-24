import axios, { AxiosResponse } from 'axios';
import {
  BaseRequestParams,
  BaseRequestResponse,
  RequestParams,
} from '../interfaces/http.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpHelper {
  constructor() {}

  public async get<Response, Headers = Record<string, any>>(
    params: BaseRequestParams<Headers>,
  ): Promise<Response> {
    const resp = await axios.get(params.url, {
      headers: params.headers as any,
      params: params.query,
    });

    return this.getResponse<Response>(resp).data;
  }

  public async post<
    Response,
    Body = Record<string, any>,
    Headers = Record<string, any>,
  >(params: RequestParams<Body, Headers>): Promise<Response> {
    const resp = await axios.post(params.url, params.body, {
      headers: params.headers as any,
    });

    return this.getResponse<Response>(resp).data;
  }

  private getResponse<T>(resp: AxiosResponse<T>): BaseRequestResponse<T> {
    return {
      error: false,
      code: resp.status,
      data: resp.data,
    };
  }
}
