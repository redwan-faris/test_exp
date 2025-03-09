import { detectLocaleFromAcceptLanguageHeader } from "@intlify/hono";
import axiosInstance from "../utils/axios";
import { local } from "../localization/localization";
import { getConfig } from "..";

export const deactivateLicense = async (c: any) => {
  try {
    const device_id = c.req.header("device");
    const license = c.get('license');
    const response = await axiosInstance.patch(`/licenses/project/deactivate/${license.id}`, {}, {
      headers: {
        'device': device_id
      }
    });
    return c.json(
      {
        status: 200,
        message: local(c, "licenseDeactivated"),
      },
      200
    );
    } catch (error: any) {
    if (error.response?.data) {
      return c.json(error.response.data, error.response.status || 500);
    }
    return c.json({ status: 500, message: local(c, "500") }, 500);
  }
};

export const deactivateLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onDeactivateLicense;
  
  if (customHook) {
    return customHook(deactivateLicense)(c);
  }

  return deactivateLicense(c);
};
