import { Response, NextFunction } from 'express';
import { callBService } from '../utils/apiAdapter';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export async function getUsers(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await callBService({
      method: 'GET',
      endpoint: '/users',
      currentUid: req.user?.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await callBService({
      method: 'GET',
      endpoint: `/users/${req.params.uid}`,
      currentUid: req.user?.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function createUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await callBService({
      method: 'POST',
      endpoint: '/users',
      data: req.body,
      currentUid: req.user?.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await callBService({
      method: 'PATCH',
      endpoint: `/users/${req.params.uid}`,
      data: req.body,
      currentUid: req.user?.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await callBService({
      method: 'DELETE',
      endpoint: `/users/${req.params.uid}`,
      currentUid: req.user?.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}