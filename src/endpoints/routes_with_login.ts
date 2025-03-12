import { Hono } from "hono";
import { deactivateLicenseWithCallback } from "./deactivateLicense";
import { checkLicenseWithCallback } from "./checkLicense"; 
import { requestHeaderValidator } from "../middlewares/license_middleware/license_middleware_validator";
import { LicenseMiddleware } from "../middlewares/license_middleware/license_middleware";
import { getConfig } from "..";
import { url } from "inspector";


export const exRoutesWithLogin = new Hono();
 
const urls = getConfig().urls;
exRoutesWithLogin.use(requestHeaderValidator,LicenseMiddleware);
exRoutesWithLogin.post(urls?.deactivateLicense ? urls?.deactivateLicense : "/deactivate", deactivateLicenseWithCallback);
exRoutesWithLogin.post(urls?.checkLicense ? urls?.checkLicense : '/verify', checkLicenseWithCallback);


 

