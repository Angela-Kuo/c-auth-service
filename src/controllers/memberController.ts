import { Response, NextFunction } from 'express';
import { callBService } from '../utils/apiAdapter';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export async function getGroupMembers(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
    const endpoint = queryString ? `/group-members?${queryString}` : '/group-members';

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

export async function addMemberToGroup(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await callBService({
      method: 'POST',
      endpoint: '/group-members',
      data: req.body,
      currentUid: req.user?.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function removeMemberFromGroup(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await callBService({
      method: 'DELETE',
      endpoint: `/group-members/${req.params.id}`,
      currentUid: req.user?.uid,
    });

    return res
      .status(result.status)
      .json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}