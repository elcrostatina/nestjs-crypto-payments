export interface BaseRequestResponse<T = void> {
  error: boolean;
  code?: number | undefined;
  data: T;
  message?: string | string[];
}

export interface BaseRequestParams<Headers = Record<any, any>> {
  url: string;
  headers?: Headers;
  query?: Record<string, any>;
}

export interface RequestParams<Body, Headers>
  extends BaseRequestParams<Headers> {
  body: Body;
}

type GenericRequestHeader<T extends Record<any, any>> = T | string | undefined;

export interface RequestHeaders<T = Record<any, any>> {
  [key: string]: GenericRequestHeader<T>;
  'Content-Type': string;
  authorization?: string;
}
