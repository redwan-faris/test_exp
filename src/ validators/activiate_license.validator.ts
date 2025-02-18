import { zValidator } from "@hono/zod-validator";
import { string, z } from "zod";
import { formatZodError } from "../utils/zod";

export const activateLicenseZodSchema = z.object({
 
    deviceType: z.string(),
    licenseId: z.string(),
});

export const activateLicenseValidator = zValidator(
  "json",
  activateLicenseZodSchema,
  formatZodError
);

export type ActivateLicenseSchema = z.infer<typeof activateLicenseZodSchema>;
