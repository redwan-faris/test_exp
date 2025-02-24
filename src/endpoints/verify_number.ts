import { detectLocaleFromAcceptLanguageHeader } from "@intlify/hono";
import axios, { AxiosError } from "axios"; 
import { local } from "../localization/localization";
import { verifyNumberSchema } from "../ validators/verify_number_validator";
import axiosInstance from "../utils/axios";
import { getConfig } from "..";
import httpClient from "../utils/http_client";
 
export const verifyNumber = async (c: any) => {
  try {
    const { phoneNumber } = verifyNumberSchema.parse(await c.req.json());

    const response = await axiosInstance.get(`/users/phone/${phoneNumber}`);

    if (response.status == 200) {
      return c.json(
        {
          status: 400,
          message: local(c, "phoneNumberAlreadyExists"),
        },
        400
      );
    }

    try {
      await httpClient.post(
        `${getConfig().env.OTP_BASE_URL}/send`,
        {
          phoneNumber,
        },
        {
          headers: {
            authorization: `Bearer ${getConfig().env.OTP_KEY}`,
            "Accept-Language": detectLocaleFromAcceptLanguageHeader(c),
          },
        }
      );

      return c.json(
        {
          status: 200,
          message: local(c, "successful"),
        },
        200
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = AxiosError.from(error);
        return c.json(axiosError.response?.data as any, 400);
      }

      const axiosError = AxiosError.from(error);
      return c.json(
        {
          status: 500,
          message: local(c, "failedToSendOtp"),
        },
        500
      );
    }
  } catch (error) {
    console.log(error);

    return c.json(
      {
        status: 500,
        message: local(c, "500"),
      },
      500
    );
  }
};

export const verifyNumberWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.useVerifyNumber;

  if (customHook) {
    return customHook(verifyNumber)(c);
  }

  return verifyNumber(c);
};
