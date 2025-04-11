export interface License {
  id: string;
  key: string;
  type: string;
  status: 'active' | 'inactive' | 'expired';
  deviceId?: string;
  version?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LicenseResponse {
  status: number;
  message: string;
  data?: {
    license?: License;
    token?: string;
    deviceId?: string;
  };
}

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

export interface VerifyNumberRequest {
  number: string;
  code?: string;
}

export interface VerifyNumberResponse {
  status: number;
  message: string;
  data?: {
    code?: string;
    verified?: boolean;
  };
}

export interface LicenseMiddlewareOptions {
  requireDeviceId?: boolean;
  requireVersion?: boolean;
}

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

export interface ErrorResponse {
  status: number;
  message: string;
  error?: any;
} 