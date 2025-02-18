import { Hono } from "hono";
import { createLicense } from "./createLicense";
import { activateLicense } from "./activateLicense";
import { deactivateLicense } from "./deactivateLicense";
import { checkLicense } from "./checkLicense"; 
import { activateLicenseValidator } from "../ validators/activiate_license.validator";
import { createLicenseValidator } from "../ validators/create_license.validator";
const exCpRoutes = new Hono();

exCpRoutes.post('/license', createLicenseValidator, ...createLicense);
exCpRoutes.post('/activate', activateLicenseValidator, ...activateLicense);
exCpRoutes.patch('/deactivate/:id', ...deactivateLicense);
exCpRoutes.get('/check/:id', ...checkLicense);

export default exCpRoutes;
