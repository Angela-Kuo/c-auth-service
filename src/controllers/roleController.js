import { callBService } from '../utils/apiAdapter.js';

export async function getRoles(req, res, next) {
  try {
    const result = await callBService({
      method: 'GET',
      endpoint: '/roles',
      currentUid: req.user.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function createRole(req, res, next) {
  try {
    const result = await callBService({
      method: 'POST',
      endpoint: '/roles',
      data: req.body,
      currentUid: req.user.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function updateRole(req, res, next) {
  try {
    const result = await callBService({
      method: 'PATCH',
      endpoint: `/roles/${req.params.rid}`,
      data: req.body,
      currentUid: req.user.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function deleteRole(req, res, next) {
  try {
    const result = await callBService({
      method: 'DELETE',
      endpoint: `/roles/${req.params.rid}`,
      currentUid: req.user.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}