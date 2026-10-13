import express from 'express';
import { getGroupMembers, addMemberToGroup, removeMemberFromGroup } from '../controllers/memberController.js';

const router = express.Router();

router.get('/', getGroupMembers);
router.post('/', addMemberToGroup);
router.delete('/:id', removeMemberFromGroup);

export default router;