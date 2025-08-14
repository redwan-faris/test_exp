import { fromZodError } from "zod-validation-error";

export const formatZodError = (result: any, c: any) => {
  if (!result.success) {
    const validationError = fromZodError(result.error);
    return c.json(
      {
        status: 400,
        message: validationError.toString(),
      },
      400
    );
  }
};
