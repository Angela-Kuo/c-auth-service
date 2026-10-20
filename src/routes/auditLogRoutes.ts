import express from 'express';

import { getAuditLogs } from '../controllers/auditLogController.js';

const router = express.Router();

router.get('/', getAuditLogs);

// 稽核紀錄只增不改：其他方法一律 405
router.all('/', (_req, res) => {
  res.set('Allow', 'GET');
  res.status(405).json({ error: 'Method Not Allowed' });
});

export default router;