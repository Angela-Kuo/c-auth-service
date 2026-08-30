import { Response, NextFunction } from 'express';
import { callBService } from '../utils/apiAdapter';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export async function getGroups(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await callBService({
      method: 'GET',
      endpoint: '/groups',
      currentUid: req.user?.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function createGroup(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await callBService({
      method: 'POST',
      endpoint: '/groups',
      data: req.body,
      currentUid: req.user?.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function updateGroup(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await callBService({
      method: 'PATCH',
      endpoint: `/groups/${req.params.gid}`,
      data: req.body,
      currentUid: req.user?.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function deleteGroup(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await callBService({
      method: 'DELETE',
      endpoint: `/groups/${req.params.gid}`,
      currentUid: req.user?.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}