import { License } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { ActivationTypes } from "./activation_types";
import { jwtSecret } from "./env";

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
  license: License,
  type: ActivationTypes,
  deviceId: string,
  accountantId: string | undefined
): string {
  return generateToken({
    id: license.id,
    deviceId: type === ActivationTypes.ACCOUNTANT ? deviceId : license.deviceId,
    type,
    expiresAt: license.expiresAt,
    accountantId,
  } as LicenseTokenPayload);
}

type LicenseTokenPayload = {
  id: string;
  deviceId: string;
  type: ActivationTypes;
  expiresAt: Date;
  accountantId: string | undefined;
};
