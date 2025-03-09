import z from 'zod'

export const defaultActivateLicenseValidator = {
    key: z.string(),
    accountantPassword: z.string().optional(),
};