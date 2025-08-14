import { local } from "../../localization/localization";
import axiosInstance from "../../utils/axios";
import { serverActions } from "../../utils/server_actions";
import { verifyLicenseToken } from "../../utils/token";
import { getConfig } from "../../index";

export const LicenseMiddleware = getConfig().factory.createMiddleware(async (c, next) => {
  const originalFunction = async (c: any, next: any) => {
    try { 

      const version: string = c.req.header("version")!;
      const deviceId: string = c.req.header("device")!;
      const token = c.req.header("authorization")?.split(" ")[1]!;
      const payload = await verifyLicenseToken(token);
      const response = await axiosInstance.get(`licenses/project/check/${payload.id}`);
      if (!response) {
        return c.json(
          {
            status: 401,
            message: local(c, "invalidKey"),
            action: serverActions("logout"),
          },
          401
        );
      } 
      c.set("license", response.data.license);
      c.set("login", response.data);
      c.set("device", deviceId);
      c.set("version", version);
      return next();
    } catch (error) {
      return c.json(
        {
          status: 401,
          action: serverActions("logout"),
          message: local(c, "unauthorized"),
        },
        401
      );
    }
  };

  const customHook = getConfig().callbacks?.onLicenseMiddleware;
  if (customHook) {
    return customHook(originalFunction)(c, next);
  }

  return originalFunction(c, next);
});