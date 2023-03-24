import { sign, verify } from 'jsonwebtoken';

const _sign = (payload: any, seed: string, expiration: number) =>
  sign(payload, seed, { expiresIn: expiration })

const _verify = (token: string, seed: string) => verify(token, seed)

export const jwt = { sign: _sign, verify: _verify };