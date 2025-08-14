import { z } from 'zod';
import { ActivationTypes } from '../utils/activation_types';
import { Provinces } from '@prisma/client';

// Base Types
export const BaseResponseSchema = z.object({
  status: z.number(),
  message: z.string()
});

// License Types
export const CitySchema = z.object({
  id: z.number(),
  name: z.string()
});

export const RegionSchema = z.object({
  id: z.number(),
  name: z.string(),
  cityId: z.number(),
  city: CitySchema
});

export const AddressSchema = z.object({
  id: z.string(),
  nearestLandmark: z.string().optional().nullable(),
  regionId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  customerId: z.string().nullable(),
  region: RegionSchema
});

export const CustomerSchema = z.object({
  id: z.number(),
  name: z.string(),
  phoneNumber: z.string(),
  secondaryPhoneNumber: z.string().nullable(),
  notes: z.string().nullable(),
  referredById: z.string().nullable(),
  // gender: z.nativeEnum(Gender).optional(),
  province: z.nativeEnum(Provinces).optional(),
  address: z.string().optional(),
  // role: z.nativeEnum(Role).optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const LicenseSchema = z.object({
  id: z.string(),
  name: z.string(),
  isActive: z.boolean(),
  customerId: z.number(),
  projectId: z.string(),
  expiresAt: z.string(),
  isBlocked: z.boolean(),
  enableEPayments: z.boolean(),
  createdById: z.string().nullable(),
  type: z.nativeEnum(ActivationTypes),
  addressId: z.string().optional().nullable(),
  allowedLoginAttempt: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  customer: CustomerSchema,
  address: AddressSchema.optional().nullable(),
  province: z.string()
});

export const LoginSchema = z.object({
  id: z.string(),
  deviceId: z.string(),
  version: z.string(),
  deviceType: z.string().nullable(),
  isActive: z.boolean(),
  logInAt: z.string(),
  logOutAt: z.string().nullable(),
  licenseId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  license: LicenseSchema
});

// Response Types
export const TokenResponseSchema = z.object({
  token: z.string(),
  license: LicenseSchema,
  login: LoginSchema.optional()
});

export const LicenseResponseSchema = z.object({
  license: LicenseSchema,
  token: z.string()
});

// Request Types
export const ActivateLicenseRequestSchema = z.object({
  key: z.string(),
  deviceId: z.string().optional(),
  version: z.string().optional()
});

export const DeactivateLicenseRequestSchema = z.object({
  licenseId: z.string(),
  deviceId: z.string().optional()
});

export const verifyLicenseRequestSchema = z.object({
  licenseId: z.string(),
  deviceId: z.string().optional()
});

// OTP Types
export const VerifyNumberRequestSchema = z.object({
  number: z.string(),
  code: z.string().optional()
});

export const VerifyNumberResponseSchema = BaseResponseSchema.extend({
  data: z.object({
    code: z.string().optional(),
    verified: z.boolean().optional()
  }).optional()
});

// Middleware Types
export const LicenseMiddlewareOptionsSchema = z.object({
  requireDeviceId: z.boolean().optional(),
  requireVersion: z.boolean().optional()
});

// Token Types
export const LicenseTokenPayloadSchema = z.object({
  licenseId: z.string(),
  type: z.string(),
  deviceId: z.string(),
  version: z.string().optional(),
  iat: z.number().optional(),
  exp: z.number().optional()
});

// Error Types
export const ErrorResponseSchema = BaseResponseSchema.extend({
  error: z.object({
    code: z.string().optional(),
    details: z.string().optional(),
    stack: z.string().optional()
  }).optional()
});

// Configuration Types
export const PackageConfigSchema = z.object({
  factory: z.any(),
  urls: z.object({
    activateLicense: z.string(),
    verifyLicense: z.string(),
    createLicense: z.string(),
    deactivateLicense: z.string(),
    verifyNumber: z.string()
  }).optional(),
  env: z.object({
    OTP_BASE_URL: z.string(),
    OTP_KEY: z.string(),
    API_KEY: z.string(),
    jwtSecret: z.string(),
    QI_API_USER: z.string(),
    QI_API_PASS: z.string(),
    QI_TERMINAL_ID: z.string(),
    API_BASE_URL: z.string()
  }),
  callbacks: z.object({
    onrGenerateLicenseToken: z.function().optional(),
    onLicenseMiddleware: z.function().optional(),
    onverifyLicense: z.function().optional(),
    onCreateLicense: z.function().optional(),
    onDeactivateLicense: z.function().optional(),
    onActivateLicense: z.function().optional(),
    onVerifyNumber: z.function().optional(),
    onGetLicense: z.function().optional(),
    testPackage: z.function().optional()
  }).optional(),
  validators: z.object({
    clientActivateLicenseZodSchema: z.any().optional(),
    clientCreateLicenseZodSchema: z.any().optional(),
    clientVerifyNumberZodSchema: z.any().optional()
  }).optional()
});

// API Response Types
export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) => z.object({
  status: z.number(),
  data: dataSchema,
  message: z.string().optional()
});

// Headers Types
export const LicenseHeadersSchema = z.object({
  device: z.string().optional(),
  version: z.string().optional(),
  authorization: z.string().optional()
});

// Also export the inferred types
export type verifyLicenseRequest = z.infer<typeof verifyLicenseRequestSchema>;
export type License = z.infer<typeof LicenseSchema>;
export type LicenseResponse = z.infer<typeof LicenseResponseSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type VerifyNumberRequest = z.infer<typeof VerifyNumberRequestSchema>;
export type VerifyNumberResponse = z.infer<typeof VerifyNumberResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type LicenseMiddlewareOptions = z.infer<typeof LicenseMiddlewareOptionsSchema>;

// Additional type exports
export type BaseResponse = z.infer<typeof BaseResponseSchema>;
export type City = z.infer<typeof CitySchema>;
export type Region = z.infer<typeof RegionSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type Customer = z.infer<typeof CustomerSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type ActivateLicenseRequest = z.infer<typeof ActivateLicenseRequestSchema>;
export type DeactivateLicenseRequest = z.infer<typeof DeactivateLicenseRequestSchema>;
export type LicenseTokenPayload = z.infer<typeof LicenseTokenPayloadSchema>;
export type PackageConfig = z.infer<typeof PackageConfigSchema>;
export type LicenseHeaders = z.infer<typeof LicenseHeadersSchema>;
export type ApiResponse<T extends z.ZodType> = z.infer<ReturnType<typeof ApiResponseSchema<T>>>; 