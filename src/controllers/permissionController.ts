import { Response, NextFunction } from 'express';
import { callBService } from '../utils/apiAdapter';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export async function getPermissions(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
    const endpoint = queryString ? `/permissions?${queryString}` : '/permissions';

    const result = await callBService({
      method: 'GET',
      endpoint,
      currentUid: req.user?.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function createPermission(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await callBService({
      method: 'POST',
      endpoint: '/permissions',
      data: req.body,
      currentUid: req.user?.uid,
    });

    return res
      .status(result.status)
      .json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function deletePermission(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await callBService({
      method: 'DELETE',
      endpoint: `/permissions/${req.params.id}`,
      currentUid: req.user?.uid,
    });

    return res
      .status(result.status)
      .json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}