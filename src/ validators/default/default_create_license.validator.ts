import z from "zod";
import { LicenseTypeEnum } from "../../utils/enums/license_type.enum";
import { phoneRegex } from "../../utils/constants";
import { ProvincesEnum } from "../../utils/enums/provinces_enum";

export const defaultCreateLicenseValidator = {
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
      address: z.string(),
      province:ProvincesEnum  
    }).optional(),
  }