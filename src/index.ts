import { 
  License, 
  LicenseResponse, 
  ActivateLicenseRequest, 
  DeactivateLicenseRequest, 
  CheckLicenseRequest, 
  VerifyNumberRequest, 
  VerifyNumberResponse, 
  LicenseMiddlewareOptions, 
  ErrorResponse 
} from './types';

import { activateLicense } from "./endpoints/activateLicense";
import { checkLicense } from "./endpoints/checkLicense";
import { createLicense } from "./endpoints/createLicense";
import { deactivateLicense } from "./endpoints/deactivateLicense";
import { verifyNumber } from "./endpoints/verify_number";
import { createLicenseMiddleware } from "./middlewares/license_middleware/license_middleware";
import { testPackage } from "./utils/testPackage";
import { generateLicenseToken } from "./utils/token";

interface PackageConfig {
  factory: any;
  urls?:{
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
    onrGenerateLicenseToken?: (originalFunction: typeof generateLicenseToken) => typeof generateLicenseToken;
    onLicenseMiddleware?: (originalFunction: typeof licenseMiddleware) => typeof licenseMiddleware,
    onCheckLicense?: (originalFunction: typeof checkLicense) => typeof checkLicense;
    onCreateLicense?: (originalFunction: typeof createLicense) => typeof createLicense;
    onDeactivateLicense?: (originalFunction: typeof deactivateLicense) => typeof deactivateLicense;
    onActivateLicense?: (originalFunction: typeof activateLicense) => typeof activateLicense;
    onVerifyNumber?: (originalFunction: typeof verifyNumber) => typeof verifyNumber;
    testPackage?: (originalFunction: typeof testPackage) => typeof testPackage;


  };
  validators?: {
    clientActivateLicenseZodSchema?: any,
    clientCreateLicenseZodSchema?: any,
    clientVerifyNumberZodSchema?: any
  }
}

let globalConfig: PackageConfig | null = null;
let _routes: any = null;

export function init(config: PackageConfig): void {
  if (config) {
    globalConfig = config;
    const { exRoutesWithoutLogin, exRoutesWithLogin } = require("./endpoints");
    _routes = { 
      exRoutesWithoutLogin, 
      exRoutesWithLogin,
      licenseMiddleware: createLicenseMiddleware()
    };
  } else {
    throw new Error("Invalid configuration provided");
  }
}

export function getConfig(): PackageConfig {
  if (!globalConfig) {
    throw new Error("Config not set. Please call init() first.");
  }
  return globalConfig;
}

export function isConfigInitialized(): boolean {
  return globalConfig !== null;
}

export const exRoutesWithoutLogin = new Proxy({}, {
  get: function (target, prop) {
    if (!globalConfig) {
      throw new Error("Config not set. Please call init() first.");
    }
    return _routes.exRoutesWithoutLogin[prop];
  }
});

export const exRoutesWithLogin = new Proxy({}, {
  get: function (target, prop) {
    if (!globalConfig) {
      throw new Error("Config not set. Please call init() first.");
    }
    return _routes.exRoutesWithLogin[prop];
  }
});

export const licenseMiddleware = new Proxy(function() {}, {
  get: function (target, prop) {
    if (!globalConfig) {
      throw new Error("Config not set. Please call init() first.");
    }
    return _routes.licenseMiddleware[prop];
  }
});

export {
  License,
  LicenseResponse,
  ActivateLicenseRequest,
  DeactivateLicenseRequest,
  CheckLicenseRequest,
  VerifyNumberRequest,
  VerifyNumberResponse,
  LicenseMiddlewareOptions,
  PackageConfig,
  ErrorResponse
};
