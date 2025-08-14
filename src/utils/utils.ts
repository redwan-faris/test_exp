import { LicenseTypes, Provinces } from "@prisma/client";
import { generateLicenseRes } from "../endpoints/licenses/helpers/license_response";
import { ActivationTypes } from "./activation_types";

import { generateLicenseToken } from "./token";

export const testKey = "test_key";

const testKeys = [
  // active
  "apple_active",
  // expired
  "apple_inactive",
  testKey,
];
export const isTestKey = (key: string) => {
  return testKeys.includes(key);
};

export function demoLicenseRes(deviceId: string) {
  const license = {
    id: "demo",
    type: LicenseTypes.DEMO,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    deviceId,
    isBlocked: false,
    activatedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const token = generateLicenseToken(
    license,
    ActivationTypes.DEMO,
    "demo",
    undefined
  );
  return generateLicenseRes({
    license,
    garage: {
      name: "كراج المحبة",
      owner: "محمد علي",
      province: Provinces.Ninawa,
      location: "حي الزراعي",
    },
    token,
  });
}
