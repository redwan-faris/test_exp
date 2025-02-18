import { z } from "zod";

export const LicenseTypeEnum = z.enum([
    "TEST",
    "PRODUCTION"
]);

export type LicenseTypeEnum = z.infer<typeof LicenseTypeEnum>;
