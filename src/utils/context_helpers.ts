import { Garage, License } from "@prisma/client";
import { ActivationTypes } from "./activation_types";

export const getDeviceId = function (c: any): string {
  return c.get("device") ?? c.req.header("device");
};

export const getVersion = function (c: any): string {
  return c.get("version") ?? c.req.header("version");
};

export const getLicense = function (c: any): License & { garage: Garage } {
  const license = c.get("license");
  return license;
};
export const getActivationType = function (c: any): ActivationTypes {
  return c.get("type");
};
