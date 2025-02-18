import { local } from "../localization/localization";
import axiosInstance from "../utils/axio";
import { factory } from "../utils/factory";


export const checkLicense = factory.createHandlers(async (c) => {
  try {
    const id = c.req.param("id");
    const response = await axiosInstance.get(`licenses/project/check/${id}`);
    return c.json(response.data, 200);
  } catch (error) {
    console.error(error);
    return c.json({ status: 500, message: local(c, "500") }, 500);
  }
});
