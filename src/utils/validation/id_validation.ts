import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { formatZodError } from "../zod";

export const idSchema = z.object({
  id: z.string(),
});

export const idValidator = zValidator("json", idSchema, formatZodError);

export type IdSchema = z.infer<typeof idSchema>;
