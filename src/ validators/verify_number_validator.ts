import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { formatZodError } from "../utils/zod";

export const verifyNumberSchema = z.object({
  phoneNumber: z.string(),
});

export const verifyNumberValidator = zValidator(
  "json",
  verifyNumberSchema,
  formatZodError
);

export type VerifyNumberSchema = z.infer<typeof verifyNumberSchema>;
