import axiosInstance from "../utils/axios";
import { activateLicenseZodSchema } from "../ validators/activiate_license.validator";
import { local } from "../localization/localization";
import { generateLicenseToken } from "../utils/token";
import { getConfig } from './../index'
import { LicenseSchema, LoginSchema, TokenResponseSchema } from "../types/schemas";
import { Context } from "hono";
import { ActivateLicenseResponse, ActivateLicenseHandlerResponse } from "../types/types";
 
const activateLicenseHandler = async (c: Context): Promise<ActivateLicenseHandlerResponse> => { 
  try {
    const device_id = c.req.header("device") as string;
    const version = c.req.header("version") as string;
    const data = activateLicenseZodSchema.parse(await c.req.json());
    data['deviceId'] = device_id as string;
    data['version'] = version as string;
    data['licenseId'] = data.key as string;
    delete data.key;
    const response = await axiosInstance.post('/licenses/project/activate', data);
    const license = LicenseSchema.parse(response.data.license);
    const login = LoginSchema.parse(response.data);
    
    const token = generateLicenseToken(license, license.type, device_id, undefined,login.deviceId);
    const tokenResponse: ActivateLicenseResponse = TokenResponseSchema.parse({token, license ,login});
    return {
      data: tokenResponse,
      status: 200
    };
  } catch (error: any) {
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

const handlers = getConfig().factory.createHandlers(activateLicenseHandler);
export const activateLicense = handlers[0];

export const activateLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onActivateLicense;

  if (customHook) {
    return customHook(activateLicense)(c);
  }

  return activateLicense(c);
};
