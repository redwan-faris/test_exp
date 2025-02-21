import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { formatZodError } from "../../utils/zod";

const schema = z
  .object({
    version: z.string({
      required_error: "Version is required",
      invalid_type_error: "Version must be a string",
    }),
    device: z.string({
      required_error: "Device id is required",
      invalid_type_error: "Device id must be a string",
    }),
    authorization: z.string({
      required_error: "Authorization is required",
      invalid_type_error: "Authorization must be a string",
    }),
  })
  .superRefine((d, ctx) => {
    if (!d.authorization.startsWith("Bearer ")) {
      ctx.addIssue({
        code: "custom",
        message: "Authorization must be a bearer token",
      });
    }
  });

export const requestHeaderValidator = zValidator(
  "header",
  schema,
  formatZodError
);

export type RequestHeaderSchema = z.infer<typeof schema>;
