import { getConfig } from "..";
import { local } from "../localization/localization";
import axiosInstance from "../utils/axios";
import { generateLicenseToken } from "../utils/token";

// Original checkLicense function
export const checkLicense = async (c: any) => {
  try {
    const license = c.get("license");
    const { garage, deviceId: device, ...rest } = license;
    const response = await axiosInstance.get(`licenses/project/check/${license.id}`);
    const token = generateLicenseToken(license, license.type, device, undefined);

    return c.json(
      {
        license,
        token
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json({ status: 500, message: local(c, "500") }, 500);
  }
};

export const checkLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.useCheckLicense;

  if (customHook) {
    return customHook(checkLicense)(c);
  }

  return checkLicense(c);
};
