import { detectLocaleFromAcceptLanguageHeader } from "@intlify/hono";
import axiosInstance from "../utils/axios";
import { local } from "../localization/localization";
import { getConfig } from "..";
 

export const deactivateLicense = getConfig().factory.createHandlers(async (c) => {
  try {
    
    const license = c.get('license');
    const response = await axiosInstance.patch(`/licenses/project/deactivate/${license.id}`);
    return c.json(response.data, 200);
  } catch (error) {
    console.log(error);

    return c.json(
      {
        status: 500,
        message: local(c, "500"),
      },
      500
    );
  }
});
