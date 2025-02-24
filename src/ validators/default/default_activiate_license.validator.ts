import z from 'zod'

export const defaultActivateLicenseValidator = {
    deviceType: z.string(),
    licenseId: z.string(),
};