import { createLicenseZodSchema } from "../ validators/create_license.validator";
import { local } from "../localization/localization";
import axiosInstance from "../utils/axio";
import { factory } from "../utils/factory"; 

export const createLicense = factory.createHandlers(async (c) => {
  try {
    const data = createLicenseZodSchema.parse(await c.req.json());
    const response = await axiosInstance.post('/licenses/project', data);
    return c.json(response.data, 200);
  } catch (error) {
    console.error(error);
    return c.json({ status: 500, message: local(c, "500") }, 500);
  }
});
