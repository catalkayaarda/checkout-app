export interface Login {
  phone_number: string;
  password: string;
}

export interface OTPTokenOut {
  otp_token: string;
}

export interface LoginWithOtp {
  phone_number: string;
  password: string;
  otp_token: string;
}

export interface AccessTokenOut {
  access_token: string;
}

export interface MessageOut {
  message: string;
}

export interface AccessTokenOut {
  access_token: string;
}
