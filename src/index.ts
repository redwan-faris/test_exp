import { exCpRoutes } from "./endpoints";
export default exCpRoutes;


interface PackageConfig {
    factory: any
  }
  
  let globalConfig: PackageConfig | null = null;
  
  export function setConfig(config: PackageConfig) {
    globalConfig = config;
  }
  
  export function getConfig(): PackageConfig {
    if (!globalConfig) {
      throw new Error("Config not set. Call setConfig() first.");
    }
    return globalConfig;
  }
  