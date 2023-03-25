import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const sign = async (payload: any, secret: string, expiration: number): Promise<string> => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiration;

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

const verify = async (token: string, secret: string): Promise<JWTPayload> => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
}
export const jwt = { sign, verify };