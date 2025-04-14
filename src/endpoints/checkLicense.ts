import { detectLocaleFromAcceptLanguageHeader } from "@intlify/hono";
import axiosInstance from "../utils/axios";
import { local } from "../localization/localization";
import { getConfig } from "..";
import { Context } from "hono";
import { CheckLicenseHandlerResponse, CheckLicenseResponse } from "../types/types";

const checkLicenseHandler = async (c: Context): Promise<CheckLicenseHandlerResponse> => { 
  try {
    const device_id = c.req.header("device");
    const license = c.get('license');
    const response = await axiosInstance.get(`/licenses/project/${license.id}`, {
      headers: {
        'device': device_id
      }
    });
    const successResponse: CheckLicenseResponse = {
      token: response.data.data.token,
      license: response.data.data.license,
      login: response.data.data.login
    };
    return {
      data: successResponse,
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

const handlers = getConfig().factory.createHandlers((c: Context) => {
  return checkLicenseHandler(c).then(response => {
    return c.json(response.data, { status: response.status as 200 | 400 | 401 | 403 | 404 | 500 });
  });
});

export const checkLicense = handlers[0];

export const checkLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onCheckLicense;
  
  if (customHook) {
    return customHook(checkLicense)(c);
  }

  return checkLicense(c);
};
