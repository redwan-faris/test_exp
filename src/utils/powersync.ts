import * as crypto from "crypto";
import * as jose from "jose";
import { ActivationTypes } from "./activation_types";
import { powersyncPrivateKey } from "./env";

export async function generateKeyPair() {
  const alg = "RS256";
  const kid = `powersync-${crypto.randomBytes(5).toString("hex")}`;

  const { publicKey, privateKey } = await jose.generateKeyPair(alg, {
    extractable: true,
  });

  const privateJwk = {
    ...(await jose.exportJWK(privateKey)),
    alg,
    kid,
  };
  const publicJwk = {
    ...(await jose.exportJWK(publicKey)),
    alg,
    kid,
  };

  const privateBase64 = Buffer.from(JSON.stringify(privateJwk)).toString(
    "base64"
  );
  const publicBase64 = Buffer.from(JSON.stringify(publicJwk)).toString(
    "base64"
  );

  return {
    privateBase64,
    publicBase64,
  };
}

export async function generatePowerSyncToken({
  userId,
  type,
}: {
  userId: string;
  type: ActivationTypes;
}) {
  const decodedPrivateKey = Buffer.from(powersyncPrivateKey!, "base64");
  const powerSyncPrivateKey = JSON.parse(
    new TextDecoder().decode(decodedPrivateKey)
  );
  const powerSyncKey = await jose.importJWK(powerSyncPrivateKey);
  const token = await new jose.SignJWT({
    type,
  })
    .setProtectedHeader({
      alg: powerSyncPrivateKey.alg,
      kid: powerSyncPrivateKey.kid,
    })
    .setSubject(userId)
    .setIssuedAt()
    .setIssuer("ex")
    .setAudience("ex")
    .setExpirationTime("5m")
    .sign(powerSyncKey);

  return token;
}
