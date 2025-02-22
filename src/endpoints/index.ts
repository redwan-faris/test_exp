import { Hono } from "hono";
import { createLicense } from "./createLicense";
import { activateLicense } from "./activateLicense";
import { deactivateLicense } from "./deactivateLicense";
import { checkLicense } from "./checkLicense"; 
import { activateLicenseValidator } from "../ validators/activiate_license.validator";
import { createLicenseValidator } from "../ validators/create_license.validator";
import { requestHeaderValidator } from "../middlewares/license_middleware/license_middleware_validator";
import { verifyNumberValidator } from "../ validators/verify_number_validator";
import { verifyNumber } from "./verify_number";
import { LicenseMiddleware } from "../middlewares/license_middleware/license_middleware";


export const exCpRoutes = new Hono();

exCpRoutes.post("/create/verify", verifyNumberValidator, ...verifyNumber);
exCpRoutes.post("/create", createLicenseValidator, ...createLicense);

exCpRoutes.post("/activate", activateLicenseValidator, ...activateLicense);
 
exCpRoutes.use(requestHeaderValidator,LicenseMiddleware);
exCpRoutes.post("/deactivate", ...deactivateLicense);
exCpRoutes.post('/check', ...checkLicense);


 

