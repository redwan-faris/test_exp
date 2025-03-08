import { zValidator } from "@hono/zod-validator";
import { string, z } from "zod";

import { formatZodError } from "../utils/zod";
import { getConfig } from "..";
import { defaultCreateLicenseValidator } from "./default/default_create_license.validator";

const clientValidator = getConfig().validators?.clientCreateLicenseZodSchema;

export const createLicenseZodSchema = clientValidator? z.object(clientValidator) : z.object(defaultCreateLicenseValidator);

export const createLicenseValidator = zValidator(
  "json",
  createLicenseZodSchema,
  formatZodError
);

export type CreateLicenseSchema = z.infer<typeof createLicenseZodSchema>;
