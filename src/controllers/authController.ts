import { Request, Response, NextFunction } from 'express';
import { callBService } from '../utils/apiAdapter';
import { signToken } from '../utils/jwt';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, pwd } = req.body;
    if (!username || !pwd) {
      return res.status(400).json({ error: 'username 與 pwd 為必填' });
    }

    // 1. 向 B 驗證帳密
    const verifyRes = await callBService({
      method: 'POST',
      endpoint: '/users/verify',
      data: { username, pwd },
    });

    if (!verifyRes.success) {
      return res.status(verifyRes.status).json({ error: verifyRes.error });
    }

    const user = verifyRes.data;

    // 2. 向 B 取得 operations 清單
    const opsRes = await callBService({
      method: 'GET',
      endpoint: `/users/${user.uid}/operations`,
    });

    const operations = opsRes.success ? opsRes.data.operations : [];

    // 3. 簽發 JWT Token
    const token = signToken({ uid: user.uid, username: user.username });

    // 4. 回傳給前端 A
    return res.status(200).json({
      message: '登入成功',
      token,
      user: {
        uid: user.uid,
        username: user.username,
        describe: user.describe,
        operations,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await callBService({
      method: 'POST',
      endpoint: '/users',
      data: req.body,
    });

    if (!result.success) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(201).json({ message: '註冊成功', user: result.data });
  } catch (error) {
    next(error);
  }
};

export const me = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({ error: '未授權的存取' });
    }

    const userRes = await callBService({
      method: 'GET',
      endpoint: `/users/${uid}`,
      userId: uid,
    });

    if (!userRes.success) {
      return res.status(userRes.status).json({ error: userRes.error });
    }

    const opsRes = await callBService({
      method: 'GET',
      endpoint: `/users/${uid}/operations`,
      userId: uid,
    });

    return res.status(200).json({
      user: {
        ...userRes.data,
        operations: opsRes.success ? opsRes.data.operations : [],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const uid = req.user?.uid;

  if (!uid) {
    return res.status(401).json({
      error: '未授權的登出請求',
    });
  }

  return res.status(200).json({
    message: '已成功登出',
    uid,
  });
};