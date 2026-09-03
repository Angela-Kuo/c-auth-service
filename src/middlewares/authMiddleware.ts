import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: number; // 明確定義必須包含 uid
    username?: string;
    [key: string]: any;
  };
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未提供身份驗證 Token，請先登入' });
  }

  const token = authHeader.split(' ')[1];
  const decoded: any = verifyToken(token); // 解析 JWT
  
  // 強化檢查：不只檢查 Token 是否有效，還要檢查裡面有沒有包 uid
  if (!decoded || typeof decoded.uid === 'undefined') {
    return res.status(401).json({ error: 'Token 無效、已過期，或缺少使用者識別碼 (uid)' });
  }

  // 明確將解出來的 uid 與其他資訊塞進 req.user，準備交給下一棒
  (req as AuthenticatedRequest).user = {
    uid: Number(decoded.uid), // 確保轉為數字型態
    username: decoded.username,
    ...decoded
  };

  next();
}