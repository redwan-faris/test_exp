import { zValidator } from "@hono/zod-validator";
import { string, z } from "zod";
import { formatZodError } from "../utils/zod";
import { defaultActivateLicenseValidator } from "./default/default_activiate_license.validator";
import {getConfig} from './../index';

const clientValidator = getConfig().validators?.clientActivateLicenseZodSchema;
export const activateLicenseZodSchema = clientValidator? z.object(clientValidator) : z.object(defaultActivateLicenseValidator);

export const activateLicenseValidator = zValidator(
  "json",
  activateLicenseZodSchema,
  formatZodError
);

export type ActivateLicenseSchema = z.infer<typeof activateLicenseZodSchema>;
