import { Hono } from "hono";
import { createLicenseWithCallback } from "./createLicense";
import { activateLicenseWithCallback } from "./activateLicense";
import { activateLicenseValidator } from "../ validators/activiate_license.validator";
import { createLicenseValidator } from "../ validators/create_license.validator";
import { verifyNumberValidator } from "../ validators/verify_number_validator";
import { verifyNumberWithCallback } from "./verify_number";

export const routesWithoutLogin = new Hono();

routesWithoutLogin.post("/create/verify", verifyNumberValidator, verifyNumberWithCallback);
routesWithoutLogin.post("/create", createLicenseValidator, createLicenseWithCallback);

routesWithoutLogin.post("/activate", activateLicenseValidator, activateLicenseWithCallback);
 
