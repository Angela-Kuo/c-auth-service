import { Response, NextFunction } from 'express';
import { callBService } from '../utils/apiAdapter';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export async function getMyOperations(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const uid = req.user?.uid;
    const result = await callBService({
      method: 'GET',
      endpoint: `/users/${uid}/operations`,
      currentUid: uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}