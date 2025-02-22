import { getConfig } from "..";
import { local } from "../localization/localization";
import axiosInstance from "../utils/axio";
import { generateLicenseToken } from "../utils/token";


export const checkLicense = getConfig().factory.createHandlers(async (c) => {
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
});
