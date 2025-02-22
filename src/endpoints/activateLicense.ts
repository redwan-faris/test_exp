
import axiosInstance from "../utils/axio";
import { activateLicenseZodSchema } from "../ validators/activiate_license.validator";
import { local } from "../localization/localization";
import { generateLicenseToken } from "../utils/token";
import { getConfig } from './../index'
export const activateLicense = getConfig().factory.createHandlers(async (c) => {
  try {
    const device_id = c.req.header("device");
    const version = c.req.header("version");
    const data = activateLicenseZodSchema.parse(await c.req.json());
    data['device_id'] = device_id;
    data['version'] = version;

    const response = await axiosInstance.post('/licenses/project/activate', data);
    const license = response.data.license;
    const token = generateLicenseToken(license, license.type, device_id, undefined);

    return c.json({token,license}, 200);
  } catch (error) {
    console.error(error);
    return c.json({ status: 500, message: local(c, "500") }, 500);
  }
});
