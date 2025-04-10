import { ActivationTypes } from "./activation_types";

export const getDeviceId = function (c: any): string {
  return c.get("device") ?? c.req.header("device");
};

export const getVersion = function (c: any): string {
  return c.get("version") ?? c.req.header("version");
};

 
export const getActivationType = function (c: any): ActivationTypes {
  const license = c.get('license');
  return license.type;
};
 
