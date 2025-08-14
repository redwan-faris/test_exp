import { activateLicense } from "./endpoints/activateLicense";
import { verifyLicense } from "./endpoints/verifyLicense";
import { createLicense } from "./endpoints/createLicense";
import { deactivateLicense } from "./endpoints/deactivateLicense";
import { verifyNumber } from "./endpoints/verify_number";
import { getLicense } from "./endpoints/get_license";
import { ErrorResponse } from "./types/schemas";
import { testPackage } from "./utils/testPackage";
import { generateLicenseToken } from "./utils/token";
import { LicenseMiddleware } from "./middlewares/license_middleware/license_middleware";
interface PackageConfig {
  factory: any;
  urls?:{
    activateLicense: string;
    verifyLicense: string;
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
    onVerifyLicense?: (originalFunction: typeof verifyLicense) => typeof verifyLicense;
    onLicenseMiddleware?: (originalFunction: typeof LicenseMiddleware) => typeof LicenseMiddleware,
    onCreateLicense?: (originalFunction: typeof createLicense) => typeof createLicense;
    onDeactivateLicense?: (originalFunction: typeof deactivateLicense) => typeof deactivateLicense;
    onActivateLicense?: (originalFunction: typeof activateLicense) => typeof activateLicense;
    onVerifyNumber?: (originalFunction: typeof verifyNumber) => typeof verifyNumber;
    onGetLicense?: (originalFunction: typeof getLicense) => typeof getLicense;
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
    const {  exRoutes } = require("./endpoints");
    const { LicenseMiddleware } = require("./middlewares/license_middleware/license_middleware");
        _routes = { 
       
      exRoutes,
      LicenseMiddleware,
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

 

export const exRoutes = new Proxy({}, {
  get: function (target, prop) {
    if (!globalConfig) {
      throw new Error("Config not set. Please call init() first.");
    }
    return _routes.exRoutes[prop];
  }
});

export const licenseMiddleware = new Proxy(function() {}, {
  apply: function(target, thisArg, args) {
    if (!globalConfig) {
      throw new Error("Config not set. Please call init() first.");
    }
    return _routes.LicenseMiddleware.apply(thisArg, args);
  }
});
