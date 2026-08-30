import { callBService } from '../utils/apiAdapter.js';

export async function getGroupMembers(req, res, next) {
  try {
    const queryString = new URLSearchParams(req.query).toString();
    const endpoint = queryString ? `/group-members?${queryString}` : '/group-members';

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

export async function addMemberToGroup(req, res, next) {
  try {
    const result = await callBService({
      method: 'POST',
      endpoint: '/group-members',
      data: req.body,
      currentUid: req.user.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}

export async function removeMemberFromGroup(req, res, next) {
  try {
    const result = await callBService({
      method: 'DELETE',
      endpoint: '/group-members',
      data: req.body,
      currentUid: req.user.uid,
    });
    return res.status(result.status).json(result.success ? result.data : { error: result.error });
  } catch (error) {
    next(error);
  }
}