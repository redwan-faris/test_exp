import { zValidator } from "@hono/zod-validator";
import { string, z } from "zod";
import {LicenseTypeEnum} from './../utils/enums/license_type.enum';
import {ProvincesEnum} from './../utils/enums/provinces_enum';
import {phoneRegex} from './../utils/constants';
import { formatZodError } from "../utils/zod";

export const createLicenseZodSchema = z.object({
  name: z.string().min(1, "License name is required"),
  customerId: z.number().int().optional(),
  subscriptionPeriod: z.number().optional(),
  type: LicenseTypeEnum,
    customer:z.object({
        name: z.string().min(1, "customer name is required"),
        phoneNumber: z.string().regex(phoneRegex,'The Phone number is invalid'),
          addresses:z.array(
          z.object({
            province: ProvincesEnum,
            address: z.string(),
          })
        ),
        notes: z.string().optional(),
    }).optional(),
  addressId: z.string().optional(),
  address: z.object({
    address: string(),
    province:ProvincesEnum  
  }).optional(),
});

export const createLicenseValidator = zValidator(
  "json",
  createLicenseZodSchema,
  formatZodError
);

export type CreateLicenseSchema = z.infer<typeof createLicenseZodSchema>;
