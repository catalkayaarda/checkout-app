interface RequestMoneySenderOut {
  wallet_no: string;
  full_name: string;
  image: string;
}

export interface RequestMoneyOut {
  sender: RequestMoneySenderOut;
  receiver_phone: string;
  amount: string;
  note: string;
  is_wallet_customer: boolean;
}

export interface CreditIn {
  request_token: string;
  amount: number;
  card_number: string;
  card_holder: string;
  card_exp_date: string;
  cvv: string;
}

export interface CreditOut {
  redirect_url: string;
  transaction_id: string;
  success_url: string;
  fail_url: string;
}

export interface CreditMessageOut {
  status: string;
}
