import { detectLocaleFromAcceptLanguageHeader } from "@intlify/hono";
import axiosInstance from "../utils/axio";
import { factory } from "../utils/factory";
import { local } from "../localization/localization";
 

export const deactivateLicense = factory.createHandlers(async (c) => {
  try {
    
    const id = c.req.param("id");
    const response = await axiosInstance.patch(`/licenses/project/deactivate/${id}`);

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
