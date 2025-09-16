export interface ISendOTP {
  email: string
}

export interface IVerifyOTP {
  email: string;
  otp: string
}
