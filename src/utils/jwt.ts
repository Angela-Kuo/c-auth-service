import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export function generateToken(payload: object): string {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn as any });
}

// 供 authController 別名相容使用
export const signToken = generateToken;

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
}