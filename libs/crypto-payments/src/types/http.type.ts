export type BaseRequestResponse<T = void> = {
  error: boolean;
  code?: number | undefined;
  data: T;
  message?: string | string[];
};

export type BaseRequestParams<Headers = Record<any, any>> = {
  url: string;
  headers?: Headers;
  query?: Record<string, any>;
};

export type RequestParams<Body, Headers> = BaseRequestParams<Headers> & {
  body: Body;
};

type GenericRequestHeader<T extends Record<any, any>> = T | string | undefined;

export type RequestHeaders<T = Record<any, any>> = {
  [key: string]: GenericRequestHeader<T>;
  'Content-Type': string;
  authorization?: string;
};
