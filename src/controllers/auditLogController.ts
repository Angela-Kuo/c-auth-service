import { Response, NextFunction } from 'express';
import { callBService } from '../utils/apiAdapter';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export async function getAuditLogs(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // 把 limit / offset / actorUid / action 原樣轉給 B，由 B 驗證並回 400
    const queryString = new URLSearchParams(
      req.query as Record<string, string>
    ).toString();
    const endpoint = queryString
      ? `/audit-logs?${queryString}`
      : '/audit-logs';

    const result = await callBService({
      method: 'GET',
      endpoint,
      currentUid: req.user?.uid,
    });

    return res
      .status(result.status)
      .json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}