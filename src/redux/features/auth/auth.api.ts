import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOTP, IVerifyOTP } from "@/types";


const authApi = baseApi.injectEndpoints(
  {
    endpoints: (builder) => ({
      register: builder.mutation(
        {
          query: (userInfo) =>({
            url: "/user/register",
            method: "POST",
            data: userInfo
          })
        }
      ),

      login: builder.mutation(
        {
          query: (userInfo) =>({
            url: "auth/login",
            method: "POST",
            data: userInfo
          })
        }
      ),

      sendOTP: builder.mutation<IResponse<null>, ISendOTP>(
        {
          query: (userInfo) =>({
            url: "otp/send",
            method: "POST",
            data: userInfo
          })
        }
      ),

      verifyOTP: builder.mutation<IResponse<null>, IVerifyOTP>(
        {
          query: (userInfo) =>({
            url: "otp/verify",
            method: "POST",
            data: userInfo
          })
        }
      )

    })
  }
);

export const {useRegisterMutation, useLoginMutation, useSendOTPMutation, useVerifyOTPMutation} = authApi;
