export type CryptomusResponse = {
  state: number;
  result?: CryptomusResult;
  message?: string;
};

export type CryptomusResult = {
  uuid: string;
  order_id: string;
  amount: string;
  payment_amount: any;
  payer_amount: any;
  discount_percent: any;
  discount: string;
  payer_currency: any;
  currency: string;
  merchant_amount: any;
  network: any;
  address: any;
  from: any;
  txid: any;
  payment_status: string;
  url: string;
  expired_at: number;
  status: string;
  is_final: boolean;
  additional_data: any;
  created_at: string;
  updated_at: string;
};
