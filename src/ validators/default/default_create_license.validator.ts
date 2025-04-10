import z from "zod";
import { LicenseTypeEnum } from "../../utils/enums/license_type.enum";
import { phoneRegex } from "../../utils/constants";
import { ProvincesEnum } from "../../utils/enums/provinces_enum";

export const defaultCreateLicenseValidator = {
    userName: z.string().min(1, "License name is required"),
    phoneNumber: z.string().regex(phoneRegex,'The Phone number is invalid'),
    garageName: z.string().min(1, "Garage name is required"),
    regionId: z.number().min(1, "Region ID is required"),
    nearestLandmark: z.string().min(1, "Location is required"),
    otp: z.string().min(1, "OTP is required"),
  }