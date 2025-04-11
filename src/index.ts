import { 
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
} from './types';

import { activateLicense } from "./endpoints/activateLicense";
import { checkLicense } from "./endpoints/checkLicense";
import { createLicense } from "./endpoints/createLicense";
import { deactivateLicense } from "./endpoints/deactivateLicense";
import { verifyNumber } from "./endpoints/verify_number";
import { LicenseMiddleware } from "./middlewares/license_middleware/license_middleware";
import { testPackage } from "./utils/testPackage";
import { generateLicenseToken } from "./utils/token";

let globalConfig: PackageConfig | null = null;
let _routes: any = null;

export function init(config: PackageConfig): void {
  if (config) {
    globalConfig = config;
    const { exRoutesWithoutLogin, exRoutesWithLogin } = require("./endpoints");
    const { LicenseMiddleware } = require("./middlewares/license_middleware/license_middleware");
    const { licenseMiddlewareValidator } = require("./middlewares/license_middleware/license_middleware_validator");
    _routes = { 
      exRoutesWithoutLogin, 
      exRoutesWithLogin,
      LicenseMiddleware,
      licenseMiddlewareValidator,
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
  apply: function(target, thisArg, args) {
    if (!globalConfig) {
      throw new Error("Config not set. Please call init() first.");
    }
    return _routes.LicenseMiddleware.apply(thisArg, args);
  }
});

export const licenseMiddlewareValidators = new Proxy({}, {
  get: function (target, prop) {
    if (!globalConfig) {
      throw new Error("Config not set. Please call init() first.");
    }
    return _routes.licenseMiddlewareValidator[prop];
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
