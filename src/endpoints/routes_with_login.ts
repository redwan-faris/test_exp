import { Hono } from "hono";
import { deactivateLicenseWithCallback } from "./deactivateLicense";
import { checkLicenseWithCallback } from "./checkLicense"; 
import { requestHeaderValidator } from "../middlewares/license_middleware/license_middleware_validator";
import { LicenseMiddleware } from "../middlewares/license_middleware/license_middleware";


export const routesWithLogin = new Hono();
 
 
routesWithLogin.use(requestHeaderValidator,LicenseMiddleware);
routesWithLogin.post("/deactivate", deactivateLicenseWithCallback);
routesWithLogin.post('/check', checkLicenseWithCallback);


 

