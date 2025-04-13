// Base Types
export interface BaseResponse {
  status: number;
  message: string;
}

// License Types
export interface License {
  id: string;
  name: string;
  isActive: boolean;
  customerId: number;
  projectId: string;
  expiresAt: string;
  createdById: string | null;
  type: "TEST" | string;
  addressId: string;
  allowedLoginAttempt: number;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  address: Address;
  province: string;
}

export interface Customer {
  id: number;
  name: string;
  phoneNumber: string;
  secondaryPhoneNumber: string | null;
  notes: string | null;
  referredById: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  nearestLandmark: string;
  regionId: number;
  createdAt: string;
  updatedAt: string;
  customerId: string | null;
  region: Region;
}

export interface Region {
  id: number;
  name: string;
  cityId: number;
  city: City;
}

export interface City {
  id: number;
  name: string;
}

export interface Login {
  id: string;
  deviceId: string;
  version: string;
  deviceType: string | null;
  isActive: boolean;
  logInAt: string;
  logOutAt: string | null;
  licenseId: string;
  createdAt: string;
  updatedAt: string;
  license: License;
}

// Response Types
export interface TokenResponse {
  token: string;
  license: License;
  login: Login;
}

export interface LicenseResponse {
  license: License;
  token: string;
}

// Request Types
export interface ActivateLicenseRequest {
  key: string;
  deviceId?: string;
  version?: string;
}

export interface DeactivateLicenseRequest {
  licenseId: string;
  deviceId?: string;
}

export interface CheckLicenseRequest {
  licenseId: string;
  deviceId?: string;
}

// OTP Types
export interface VerifyNumberRequest {
  number: string;
  code?: string;
}

export interface VerifyNumberResponse extends BaseResponse {
  data?: {
    code?: string;
    verified?: boolean;
  };
}

// Middleware Types
export interface LicenseMiddlewareOptions {
  requireDeviceId?: boolean;
  requireVersion?: boolean;
}

// Token Types
export interface LicenseTokenPayload {
  licenseId: string;
  type: string;
  deviceId: string;
  version?: string;
  iat?: number;
  exp?: number;
}

// Error Types
export interface ErrorResponse extends BaseResponse {
  error?: {
    code?: string;
    details?: string;
    stack?: string;
  };
}

// Configuration Types
export interface PackageConfig {
  factory: any;
  urls?: {
    activateLicense: string;
    checkLicense: string;
    createLicense: string;
    deactivateLicense: string;
    verifyNumber: string;
  };
  env: {
    OTP_BASE_URL: string;
    OTP_KEY: string;
    API_KEY: string;
    jwtSecret: string;
    QI_API_USER: string;
    QI_API_PASS: string;
    QI_TERMINAL_ID: string;
    API_BASE_URL: string;
  };
  callbacks?: {
    onrGenerateLicenseToken?: (originalFunction: any) => any;
    onLicenseMiddleware?: (originalFunction: any) => any;
    onCheckLicense?: (originalFunction: any) => any;
    onCreateLicense?: (originalFunction: any) => any;
    onDeactivateLicense?: (originalFunction: any) => any;
    onActivateLicense?: (originalFunction: any) => any;
    onVerifyNumber?: (originalFunction: any) => any;
    testPackage?: (originalFunction: any) => any;
  };
  validators?: {
    clientActivateLicenseZodSchema?: any;
    clientCreateLicenseZodSchema?: any;
    clientVerifyNumberZodSchema?: any;
  };
}

// API Response Types
export interface ApiResponse<T = any> {
  status: number;
  data: T;
  message?: string;
}

// Headers Types
export interface LicenseHeaders {
  device?: string;
  version?: string;
  authorization?: string;
}
 
 