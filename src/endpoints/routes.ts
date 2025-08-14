import { Hono } from "hono";
import { createLicenseWithCallback } from "@redwan/ex-cp-license/src/endpoints/createLicense";
import { activateLicenseWithCallback } from "@redwan/ex-cp-license/src/endpoints/activateLicense";
import { activateLicenseValidator } from "@redwan/ex-cp-license/src/ validators/activiate_license.validator";
import { createLicenseValidator } from "@redwan/ex-cp-license/src/ validators/create_license.validator";
import { verifyNumberValidator } from "@redwan/ex-cp-license/src/ validators/verify_number_validator";
import { verifyNumberWithCallback } from "@redwan/ex-cp-license/src/endpoints/verify_number";
import { getConfig } from "@redwan/ex-cp-license/src";
import { getLicense, getLicenseWithCallback } from "@redwan/ex-cp-license/src/endpoints/get_license";
import { verifyLicenseWithCallback } from "@redwan/ex-cp-license/src/endpoints/verifyLicense";
import { requestHeaderValidator } from "@redwan/ex-cp-license/src/middlewares/license_middleware/license_middleware_validator";
import { LicenseMiddleware } from "@redwan/ex-cp-license/src/middlewares/license_middleware/license_middleware";
import { deactivateLicenseWithCallback } from "@redwan/ex-cp-license/src/endpoints/deactivateLicense";

export const exRoutes = new Hono();
const urls = getConfig().urls;



// exRoutes.get("/:id", getLicenseWithCallback);

exRoutes.post(urls?.verifyNumber ? urls?.verifyNumber : "/create/verify", verifyNumberValidator, verifyNumberWithCallback);
exRoutes.post(urls?.createLicense ? urls?.createLicense : "/create", createLicenseValidator, createLicenseWithCallback);

exRoutes.post(urls?.activateLicense ? urls?.activateLicense : "/activate", activateLicenseValidator, activateLicenseWithCallback);
 

exRoutes.use(requestHeaderValidator,LicenseMiddleware);
exRoutes.post(urls?.deactivateLicense ? urls?.deactivateLicense : "/deactivate", deactivateLicenseWithCallback);
exRoutes.post(urls?.verifyLicense ? urls?.verifyLicense : '/verify', verifyLicenseWithCallback);


 

