export const jwtSecret = process.env.JWT_SECRET ?? undefined;
export const port = process.env.PORT ?? 3000;
export const powersyncPublicKey = process.env.JWKS_PUBLIC_KEY ?? undefined;
export const powersyncPrivateKey = process.env.JWKS_PRIVATE_KEY ?? undefined;
export const otpBaseUrl = process.env.OTP_BASE_URL ?? "http://localhost:6482";
export const otpKey = process.env.OTP_KEY ?? undefined;
