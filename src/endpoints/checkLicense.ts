import { Context } from "hono";
import { getConfig } from "..";
import { local } from "../localization/localization";
import { TokenResponseSchema } from "../types/schemas";
import axiosInstance from "../utils/axios";
import { generateLicenseToken } from "../utils/token";
import { CheckLicenseHandlerResponse } from "../types/types";

const checkLicenseHandler =async (c: Context): Promise<CheckLicenseHandlerResponse> => {
  try {
    const login = c.get("login");
    const license = c.get("license");
    const { garage, deviceId: device, ...rest } = license;
    const response = await axiosInstance.get(`licenses/project/check/${license.id}`, {
      headers: {
        'device': device
      }
    });
    const token = generateLicenseToken(license, license.type, response.data.deviceId, undefined,response.data.deviceId);
    console.log(token)
    console.log(license)
    console.log(login)
    const tokenResponse = TokenResponseSchema.parse({token, license ,login});

    return {
      data: tokenResponse,
      status: 200
    }
  } catch (error: any) {
    console.log(error)
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

const handlers = getConfig().factory.createHandlers(checkLicenseHandler);
export const checkLicense = handlers[0];

export const checkLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onCheckLicense;

  if (customHook) {
    return customHook(checkLicense)(c);
  }

  return checkLicense(c);
};