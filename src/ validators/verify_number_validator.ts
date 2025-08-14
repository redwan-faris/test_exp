import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { formatZodError } from "../utils/zod";
import { getConfig } from "..";
import { defaultVerifyNumberZodSchema } from "./default/default_verify_number.validator";

const clientValidator = getConfig().validators?.clientVerifyNumberZodSchema;
export const verifyNumberSchema = clientValidator? z.object(clientValidator) : z.object(defaultVerifyNumberZodSchema);


export const verifyNumberValidator = zValidator(
  "json",
  verifyNumberSchema,
  formatZodError
);

export type VerifyNumberSchema = z.infer<typeof verifyNumberSchema>;
