import { getConfig } from "..";
import { createLicenseZodSchema } from "../ validators/create_license.validator";
import { local } from "../localization/localization";
import axiosInstance from "../utils/axios";

export const  createLicense = async (c: any) => {
  try {
    const data = createLicenseZodSchema.parse(await c.req.json());

    const exist = await axiosInstance.get('users/phone/' + data.customer?.phoneNumber);
    data['deviceId'] = c.getHeader('device');
    const response = await axiosInstance.post('/licenses/project/activate', data);
    console.log(data)

    return c.json(response.data, 200);
  } catch (error) {
    console.error(error); 
    return c.json({ status: 500, message: local(c, "500") }, 500);
  }
};

export const createLicenseWithCallback = (c: any) => {
  const customHook = getConfig().callbacks?.onCreateLicense;

  if (customHook) {
    return customHook(createLicense)(c);
  }

  return createLicense(c);
};
