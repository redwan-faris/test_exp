import { z } from "zod";

export const LicenseTypeEnum = z.enum([
    "TEST",
    "DEMO",
    "NORMAL"
]);

export type LicenseTypeEnum = z.infer<typeof LicenseTypeEnum>;
