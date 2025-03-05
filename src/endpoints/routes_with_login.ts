import { Hono } from "hono";
import { deactivateLicenseWithCallback } from "./deactivateLicense";
import { checkLicenseWithCallback } from "./checkLicense"; 
import { requestHeaderValidator } from "../middlewares/license_middleware/license_middleware_validator";
import { LicenseMiddleware } from "../middlewares/license_middleware/license_middleware";


export const exRoutesWithLogin = new Hono();
 
 
exRoutesWithLogin.use(requestHeaderValidator,LicenseMiddleware);
exRoutesWithLogin.post("/deactivate", deactivateLicenseWithCallback);
exRoutesWithLogin.post('/check', checkLicenseWithCallback);


 

