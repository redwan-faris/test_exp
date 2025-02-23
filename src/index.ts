import { LicenseMiddleware } from "./middlewares/license_middleware/license_middleware";
import { generateLicenseToken } from "./utils/token";

interface PackageConfig {
  factory: any;
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
  callbacks: {
    generateLicenseToken?: (originalFunction: typeof generateLicenseToken) => typeof generateLicenseToken;
    licenseMiddleware?: (originalFunction: typeof LicenseMiddleware) => typeof LicenseMiddleware,
    testPackage?: (originalFunction: typeof testPackage) => typeof testPackage
  };
}

let globalConfig: PackageConfig | null = null;
let _routes: any = null;

export function init(config: PackageConfig): void {
  if (config) {
    globalConfig = config;
    const { routes } = require("./endpoints");
    _routes = routes;
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

export const exCpRoutes = new Proxy({}, {
  get: function(target, prop) {
    if (!globalConfig) {
      throw new Error("Config not set. Please call init() first.");
    }
    return _routes[prop];
  }
});