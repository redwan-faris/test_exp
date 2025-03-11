import * as jwt from "jsonwebtoken";
import { ActivationTypes } from "./activation_types";
import { getConfig } from "../index";
const jwtSecret = getConfig().env.jwtSecret;
export const generateToken = (
  payload: Object,
  expiresIn?: string | undefined
) => {
  if (!jwtSecret) throw new Error("JWT_TOKEN_SECRET is not defined");

  const token = jwt.sign(payload, jwtSecret);

  return token;
};

// verify token
export function verifyToken(token: string) {
  if (!jwtSecret) throw new Error("JWT_TOKEN_SECRET is not defined");

  const decoded = jwt.verify(token, jwtSecret);

  return decoded as any;
}

export function verifyLicenseToken(token: string): LicenseTokenPayload {
  return verifyToken(token);
}

export function generateLicenseToken(
  license: any,
  type: ActivationTypes,
  deviceId: string,
  accountantId: string | undefined,
  licenseDeviceId?: string
): string {
  const originalFunction = (license: any, type: ActivationTypes, deviceId: string, accountantId: string | undefined, licenseDeviceId?: string): string => {
    console.log(licenseDeviceId)
    return generateToken({
      id: license.id,
      deviceId: type === ActivationTypes.ACCOUNTANT ? deviceId : licenseDeviceId,
      type,
      expiresAt: license.expiresAt,
      accountantId,
    } as LicenseTokenPayload);
  };

  const customHook = getConfig().callbacks?.onLicenseMiddleware;
  if (customHook) {
    return customHook(originalFunction)(license, type, deviceId, accountantId,licenseDeviceId);  
  }

  return originalFunction(license, type, deviceId, accountantId,licenseDeviceId); 
}
type LicenseTokenPayload = {
  id: string;
  deviceId: string;
  type: ActivationTypes;
  expiresAt: Date;
  accountantId: string | undefined;
};
