import express from 'express';
import { getMyOperations } from '../controllers/operationController.js';

const router = express.Router();

router.get('/me', getMyOperations); // GET /api/operations/me

export default router;