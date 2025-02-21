import { local } from "../../localization/localization";
import { factory } from "../../utils/factory";
import { serverActions } from "../../utils/server_actions";
import { verifyLicenseToken } from "../../utils/token";

export const LicenseMiddleware = factory.createMiddleware(async (c, next) => {
  try {
    const version: string = c.req.header("version")!;
    const deviceId: string = c.req.header("device")!;
    const token = c.req.header("authorization")?.split(" ")[1]!;
    const payload = await verifyLicenseToken(token);
    const license = await prisma.license.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        garage: true,
      },
    });

    if (!license) {
      return c.json(
        {
          status: 401,
          message: local(c, "invalidKey"),
          action: serverActions("logout"),
        },
        401
      );
    }

    const type = payload.type;

    if (
      type === "NORMAL" &&
      license.deviceId &&
      deviceId !== license.deviceId
    ) {
      return c.json(
        {
          status: 401,
          message: local(c, "licenseActivatedOnAnotherDevice"),
          action: serverActions("logout"),
        },
        401
      );
    }

    if (
      !c.req.path.includes("licenses/verify") &&
      license.type == "NORMAL" &&
      license.expiresAt < new Date()
    ) {
      return c.json(
        {
          status: 400,
          message: local(c, "keyExpired", { date: license.expiresAt }),
        },
        400
      );
    }

    c.set("license", license);
    c.set("device", deviceId);
    c.set("version", version);
    c.set("type", type);
    return next();
  } catch (error) {
    return c.json(
      {
        status: 401,
        action: serverActions("logout"),

        message: local(c, "unauthorized"),
      },
      401
    );
  }
});
