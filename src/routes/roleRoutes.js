import express from 'express';
import { getRoles, createRole, updateRole, deleteRole } from '../controllers/roleController.js';

const router = express.Router();

router.get('/', getRoles);
router.post('/', createRole);
router.patch('/:rid', updateRole);
router.delete('/:rid', deleteRole);

export default router;