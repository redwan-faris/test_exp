import { getConfig } from "..";
import { createLicenseZodSchema } from "../ validators/create_license.validator";
import { local } from "../localization/localization";
import axiosInstance from "../utils/axios";
import { getDeviceId } from "../utils/context_helper";

    export const createLicense = async (c: any) => {
      try {
        const rawData = await c.req.json();
        const parsedData = createLicenseZodSchema.parse(rawData);
    
        const transformedData = {
          name: parsedData.garageName,
          type:"TEST",  
          customer: {
            name: parsedData.userName,
            phoneNumber: parsedData.phoneNumber,
          },
          address: {
            regionId: parsedData.regionId,
            nearestLandmark: parsedData.nearestLandmark,
          },
        };
    
        transformedData['deviceId'] = getDeviceId(c);
    
        const response = await axiosInstance.post('/licenses/project/', transformedData);
    
        return c.json(response.data, 200);
    
      } catch (error: any) {
        if (error.response?.data) {
          return c.json(error.response.data, error.response.status || 500);
        }
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
