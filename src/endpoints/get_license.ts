import { getConfig } from "..";
import { local } from "../localization/localization";
import axiosInstance from "../utils/axios";

const getLicenseHandler = async (c: any) => { 
  try {
    const licenseId = c.req.param("licenseId") as string;
    const device = c.req.header("device");
    const response = await axiosInstance.get(`licenses/project/${licenseId}`, {
      headers: {
        'device': device
      }
    });

    const license = response.data;

    return c.json(
      {
        license
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

const handlers = getConfig().factory.createHandlers(getLicenseHandler);
export const getLicense = handlers[0];

export const getLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onGetLicense;

  if (customHook) {
    return customHook(getLicense)(c);
  }

  return getLicense(c);
};
 