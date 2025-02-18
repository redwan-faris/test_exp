import { factory } from "../utils/factory";

import axiosInstance from "../utils/axio";
import { activateLicenseZodSchema } from "../ validators/activiate_license.validator";
import { local } from "../localization/localization";

export const activateLicense = factory.createHandlers(async (c) => {
  try {
    const device_id = c.req.header("device");
    const version = c.req.header("version");
    const data = activateLicenseZodSchema.parse(await c.req.json());
    data['device_id'] = device_id;
    data['version'] = version;

    const response = await axiosInstance.post('/licenses/project/activate', data);
    return c.json(response.data, 200);
  } catch (error) {
    console.error(error);
    return c.json({ status: 500, message: local(c, "500") }, 500);
  }
});
