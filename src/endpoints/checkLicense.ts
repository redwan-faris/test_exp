import { getConfig } from "..";
import { local } from "../localization/localization";
import axiosInstance from "../utils/axios";
import { generateLicenseToken } from "../utils/token";

// Original checkLicense function
export const checkLicense = async (c: any) => {
  try {
    const login = c.get("license");
    const license = login.license;
    const { garage, deviceId: device, ...rest } = license;
    const response = await axiosInstance.get(`licenses/project/check/${license.id}`, {
      headers: {
        'device': device
      }
    });
    const token = generateLicenseToken(license, license.type, response.data.deviceId, undefined,response.data.deviceId);

    return c.json(
      {
        license,
        token
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
