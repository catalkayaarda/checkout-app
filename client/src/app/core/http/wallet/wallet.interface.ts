export interface AccountOut {
  [index: number]: {
    id: string;
    currency_code: string;
    account_type: string;
    account_type_title: string;
    balance: number;
    flag: string;
  };
}

export interface CustomerMeOut {
  first_name: string;
  last_name: string;
  full_name: string;
  customer_no: number;
  phone_number: string;
  email: string;
  birth_date: string;
  identity_number: string;
  profile_image: string;
}

export interface TransactionOut {
  transaction_id: string;
  message: string;
}

export interface CardDeposit {
  transaction_id: string;
  amount: number;
  currency: string;
  card_number: string;
  card_holder: string;
  card_exp_date: string;
  cvv: string;
}

export interface CardDepositOut {
  redirect_url: string;
  transaction_id: string;
  success_url: string;
  fail_url: string;
}

export interface PosPayStatusIn {
  transaction_id: string;
}

export interface PosPayStatusOut {
  transaction_id: string;
  status: string;
}
