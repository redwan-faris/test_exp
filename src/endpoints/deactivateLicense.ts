import { detectLocaleFromAcceptLanguageHeader } from "@intlify/hono";
import axiosInstance from "../utils/axios";
import { local } from "../localization/localization";
import { getConfig } from "..";
import { Context } from "hono";
import { DeactivateLicenseHandlerResponse, DeactivateLicenseResponse } from "../types/types";

const deactivateLicenseHandler = async (c: Context): Promise<DeactivateLicenseHandlerResponse> => { 
  try {
    const device_id = c.req.header("device");
    const license = c.get('license');
    const response = await axiosInstance.patch(`/licenses/project/deactivate/${license.id}`, {}, {
      headers: {
        'device': device_id
      }
    });
    const successResponse: DeactivateLicenseResponse = {
      status: 200,
      message: local(c, "licenseDeactivated"),
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
  return deactivateLicenseHandler(c).then(response => {
    return c.json(response.data, { status: response.status as 200 | 400 | 401 | 403 | 404 | 500 });
  });
});

export const deactivateLicense = handlers[0];

export const deactivateLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onDeactivateLicense;
  
  if (customHook) {
    return customHook(deactivateLicense)(c);
  }

  return deactivateLicense(c);
};
