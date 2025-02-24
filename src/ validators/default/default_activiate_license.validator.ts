import z from 'zod'

export const defaultActivateLicenseZodSchema = {
    deviceType: z.string(),
    licenseId: z.string(),
};