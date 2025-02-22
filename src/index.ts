import { exCpRoutes } from "./endpoints";
import { generateLicenseToken } from "./utils/token";
export default exCpRoutes;


interface PackageConfig {
  factory: any,
  env: {
    OTP_BASE_URL: string,
    OTP_KEY: string,
    API_KEY: string,
    jwtSecret: string,
    QI_API_USER: string,
    QI_API_PASS: string,
    QI_TERMINAL_ID: string
    API_BASE_URL: string,
  }
  callbacks: {
    generateLicenseToken?: (originalFunction: typeof generateLicenseToken) => typeof generateLicenseToken;
  }
}

let globalConfig: PackageConfig | null = null;

export function init(config: PackageConfig) {
  globalConfig = config;
}

export function getConfig(): PackageConfig {
  if (!globalConfig) {
    throw new Error("Config not set. Call init() first.");
  }
  return globalConfig;
}

 