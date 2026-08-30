import express from 'express';
import { getGroups, createGroup, updateGroup, deleteGroup } from '../controllers/groupController.js';

const router = express.Router();

router.get('/', getGroups);
router.post('/', createGroup);
router.patch('/:gid', updateGroup);
router.delete('/:gid', deleteGroup);

export default router;