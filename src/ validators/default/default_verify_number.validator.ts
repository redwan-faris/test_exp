import z from 'zod';

export const defaultVerifyNumberZodSchema = {
  phoneNumber: z.string(),
}