import httpClient from "../utils/http_client";
import { getConfig } from "..";
import { createLicenseZodSchema } from "../ validators/create_license.validator";
import { local } from "../localization/localization";
import axiosInstance from "../utils/axios";
import { getDeviceId } from "../utils/context_helper";
import { detectLocaleFromAcceptLanguageHeader } from "@intlify/hono";
import { Context } from "hono";
import { CreateLicenseHandlerResponse, CreateLicenseResponse } from "../types/types";

const createLicenseHandler = async (c: Context): Promise<CreateLicenseHandlerResponse> => { 
  try { 
    const rawData = await c.req.json(); 
    
    // await httpClient.post(
    //   `${getConfig().env.OTP_BASE_URL}/verify`,
    //   {
    //     phoneNumber:parsedData.phoneNumber,
    //     otp:parsedData.otp
    //   }, 
    //   {
    //     headers: {
    //       'Api-key': getConfig().env.OTP_KEY,
    //       'Content-Type': 'application/json',
    //       "Accept-Language": detectLocaleFromAcceptLanguageHeader(c),
    //     },
    //   }
    // ); 
    
    const response = await axiosInstance.post('/licenses/project', rawData);
    const successResponse: CreateLicenseResponse = { licenseKey: response.data.id };
    return {
      data: successResponse,
      status: 200
    };

  } catch (error: any) {
    console.log(error.response.data)
    if (error.response?.data) {
      return {
        data: error.response.data,
        status: error.response.status || 500
      };
    }
    return {
      data: { status: 500, message: local(c, "500") },
      status: 500
    };
  }
};

const handlers = getConfig().factory.createHandlers((c: Context) => {
  return createLicenseHandler(c).then(response => {
    return c.json(response.data, { status: response.status as 200 | 400 | 401 | 403 | 404 | 500 });
  });
});

export const createLicense = handlers[0];

export const createLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onCreateLicense;

  if (customHook) {
    return customHook(createLicense)(c);
  }

  return createLicense(c);
};
