import { hashSync, compareSync, genSaltSync } from 'bcryptjs';

const _hash = (s: string, salt: number) => hashSync(s, genSaltSync(salt));
const _compare = (s: string, hashed: string) => compareSync(s, hashed);

export const crypto = { hash: _hash, compare: _compare }; 