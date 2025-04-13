import httpClient from "../utils/http_client";
import { getConfig } from "..";
import { createLicenseZodSchema } from "../ validators/create_license.validator";
import { local } from "../localization/localization";
import axiosInstance from "../utils/axios";
import { getDeviceId } from "../utils/context_helper";
import { detectLocaleFromAcceptLanguageHeader } from "@intlify/hono";

const createLicenseHandler = async (c: any) => { 
  try { 
    const rawData = await c.req.json();
    const parsedData = createLicenseZodSchema.parse(rawData);
    await httpClient.post(
      `${getConfig().env.OTP_BASE_URL}/verify`,
      {
        phoneNumber:parsedData.phoneNumber,
        otp:parsedData.otp
      },
      {
        headers: {
          'Api-key': getConfig().env.OTP_KEY,
          'Content-Type': 'application/json',
          "Accept-Language": detectLocaleFromAcceptLanguageHeader(c),
        },
      }
    );
    const transformedData = {
      name: parsedData.garageName,
      deviceId:getDeviceId(c),
      type:"TEST",  
      customer: {
        name: parsedData.userName,
        phoneNumber: parsedData.phoneNumber,
        addresses:[
          {
            regionId: parsedData.regionId,
            nearestLandmark: parsedData.nearestLandmark,
          },
        ],
      },
      address: {
        regionId: parsedData.regionId,
        nearestLandmark: parsedData.nearestLandmark,
      },
    };

    const response = await axiosInstance.post('/licenses/project', transformedData);

    return c.json({licenseKey:response.data.id}, 200);

  } catch (error: any) {
    console.log(error)
    if (error.response?.data) {
      return c.json(error.response.data, error.response.status || 500);
    }
    return c.json({ status: 500, message: local(c, "500") }, 500);
  }
};

export const createLicense = getConfig().factory.createHandlers(createLicenseHandler);

export const createLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onCreateLicense;

  if (customHook) {
    return customHook(createLicense[0])(c);
  }

  return createLicense[0](c);
};
