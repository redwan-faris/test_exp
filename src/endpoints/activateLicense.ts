import axiosInstance from "../utils/axios";
import { activateLicenseZodSchema } from "../ validators/activiate_license.validator";
import { local } from "../localization/localization";
import { generateLicenseToken } from "../utils/token";
import { getConfig } from './../index'

export const activateLicense = async (c: any) => {
  try {
    const device_id = c.req.header("device");
    const version = c.req.header("version");
    const data = activateLicenseZodSchema.parse(await c.req.json());
    data['deviceId'] = device_id;
    data['version'] = version;
    data['licenseId'] = data.key;
    delete data.key;
    const response = await axiosInstance.post('/licenses/project/activate', data);
    const license = response.data.license;
    const token = generateLicenseToken(license, license.type, device_id, undefined);

    return c.json({ token, license }, 200);
  } catch (error: any) {
    if (error.response?.data) {
      return c.json(error.response.data, error.response.status || 500);
    }
    return c.json({ status: 500, message: local(c, "500") }, 500);
  }
};

export const activateLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onActivateLicense;

  if (customHook) {
    return customHook(activateLicense)(c);
  }

  return activateLicense(c);
};
