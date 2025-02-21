import { Hono } from "hono";
import { createLicense } from "./createLicense";
import { activateLicense } from "./activateLicense";
import { deactivateLicense } from "./deactivateLicense";
import { checkLicense } from "./checkLicense"; 
import { activateLicenseValidator } from "../ validators/activiate_license.validator";
import { createLicenseValidator } from "../ validators/create_license.validator";
import { LicenseMiddleware } from "../middlewares/license_middleware/license_middleware";
import { requestHeaderValidator } from "../middlewares/license_middleware/license_middleware_validator";
import { verifyLicense } from "./verify_license";
import { verifyNumberValidator } from "../ validators/verify_number_validator";
import { verifyNumber } from "./verify_number";
const exCpRoutes = new Hono();

exCpRoutes.post("/create", createLicenseValidator, ...createLicense);
exCpRoutes.post("/activate", activateLicenseValidator, ...activateLicense);

exCpRoutes.post("/create/verify", verifyNumberValidator, ...verifyNumber);
exCpRoutes.patch('/deactivate/:id', ...deactivateLicense);
exCpRoutes.get('/check/:id', ...checkLicense);

 
exCpRoutes.use(requestHeaderValidator, LicenseMiddleware);
exCpRoutes.post("/deactivate", ...deactivateLicense);
exCpRoutes.post("/verify", ...verifyLicense);

export default exCpRoutes;
 

