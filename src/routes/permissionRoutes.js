import express from 'express';
import { getPermissions, updatePermissions } from '../controllers/permissionController.js';

const router = express.Router();

router.get('/', getPermissions);
router.post('/', updatePermissions);

export default router;