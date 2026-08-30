import { callBService } from '../utils/apiAdapter.js';

export async function getPermissions(req, res, next) {
  try {
    const queryString = new URLSearchParams(req.query).toString();
    const endpoint = queryString ? `/permissions?${queryString}` : '/permissions';

    const result = await callBService({
      method: 'GET',
      endpoint,
      currentUid: req.user.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function updatePermissions(req, res, next) {
  try {
    const result = await callBService({
      method: 'POST',
      endpoint: '/permissions',
      data: req.body,
      currentUid: req.user.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}