import { getConfig } from "..";
import { local } from "../localization/localization";
import axiosInstance from "../utils/axios";

export const checkLicense = async (c: any) => {
  try {
    const licenseId = c.req.param("licenseId") as string;
    const device = c.req.header("device");
    const response = await axiosInstance.get(`licenses/project/${licenseId}`, {
      headers: {
        'device': device
      }
    });

    const license = response.data.license;

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

export const checkLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onCheckLicense;

  if (customHook) {
    return customHook(checkLicense)(c);
  }

  return checkLicense(c);
};
