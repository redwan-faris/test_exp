import { Hono } from "hono";
import { createLicenseWithCallback } from "./createLicense";
import { activateLicenseWithCallback } from "./activateLicense";
import { activateLicenseValidator } from "../ validators/activiate_license.validator";
import { createLicenseValidator } from "../ validators/create_license.validator";
import { verifyNumberValidator } from "../ validators/verify_number_validator";
import { verifyNumberWithCallback } from "./verify_number";
import { getConfig } from "..";
import { getLicense } from "./get_license";

export const exRoutesWithoutLogin = new Hono();
const urls = getConfig().urls;
exRoutesWithoutLogin.get(urls?.checkLicense ? urls?.checkLicense : "/check", getLicense);
exRoutesWithoutLogin.post(urls?.verifyNumber ? urls?.verifyNumber : "/create/verify", verifyNumberValidator, verifyNumberWithCallback);
exRoutesWithoutLogin.post(urls?.createLicense ? urls?.createLicense : "/create", createLicenseValidator, createLicenseWithCallback);

exRoutesWithoutLogin.post(urls?.activateLicense ? urls?.activateLicense : "/activate", activateLicenseValidator, activateLicenseWithCallback);
 
