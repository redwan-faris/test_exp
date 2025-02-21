import { local } from "../localization/localization";
import { factory } from "../utils/factory";
import { generateLicenseToken } from "../utils/token";


export const verifyLicense = factory.createHandlers(async (c) => {
  try {
    const license = getLicense(c);
    const { garage, deviceId: device, ...rest } = license;

    const token = generateLicenseToken(license);

    return c.json(
      generateLicenseRes({
        license,
        garage,
        token,
      }),
      200
    );
  } catch (error) {
    return c.json(
      {
        status: 500,
        message: local(c, "500"),
      },
      500
    );
  }
});
