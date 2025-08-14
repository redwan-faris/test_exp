import { detectLocaleFromAcceptLanguageHeader } from "@intlify/hono";
import axios, { AxiosError } from "axios"; 
import { local } from "../localization/localization";
import { verifyNumberSchema } from "../ validators/verify_number_validator";
import axiosInstance from "../utils/axios";
import { getConfig } from "..";
import httpClient from "../utils/http_client";

const verifyNumberHandler = async (c: any) => { 
  try {
    const { phoneNumber } = verifyNumberSchema.parse(await c.req.json());

    const response = await axiosInstance.get(`/users/phone/${phoneNumber}`);

    if (response.data > 0) {
      return c.json(
        {
          status: 400,
          message: local(c, "phoneNumberAlreadyExists"),
        },
        400
      );
    }

    try {
      const res = await httpClient.post(
        `${getConfig().env.OTP_BASE_URL}/send`,
        {
          phoneNumber,
        },
        {
          headers: {
            'Api-key': getConfig().env.OTP_KEY,
            'Content-Type': 'application/json',
            "Accept-Language": detectLocaleFromAcceptLanguageHeader(c),
          },
        }
      );
console.log(res)
      return c.json(
        {
          status: 200,
          message: local(c, "successful"),
        },
        200
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return c.json(axiosError.response?.data || {
          status: 400,
          message: local(c, "failedToSendOtp"),
        }, 400);
      }

      return c.json(
        {
          status: 500,
          message: local(c, "failedToSendOtp"),
        },
        500
      );
    }
  } catch (error: any) {
    if (error.response?.data) {
      return c.json(error.response.data, error.response.status || 500);
    }
    return c.json({ 
      status: 500, 
      message: local(c, "500") 
    }, 500);
  }
};

const handlers = getConfig().factory.createHandlers(verifyNumberHandler);
export const verifyNumber = handlers[0];

export const verifyNumberWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onVerifyNumber;

  if (customHook) {
    return customHook(verifyNumber)(c);
  }

  return verifyNumber(c);
};
