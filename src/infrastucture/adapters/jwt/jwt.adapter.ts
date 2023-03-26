import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

type PayloadResponse<T> = JWTPayload & T;

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

const verify = async <T>(token: string, secret: string): Promise<PayloadResponse<T>> => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload as PayloadResponse<T>;
}
export const jwt = { sign, verify };