import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { authenticate } from './middlewares/authMiddleware.js';

// 匯入 6 大路由模組
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';

const app = express();

// CORS 設定
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// 1. 公開/認證路由
app.use('/api/auth', authRoutes);

// 2. 受 Token 保護的代理業務路由
app.use('/api/users', authenticate, userRoutes);
app.use('/api/groups', authenticate, groupRoutes);
app.use('/api/roles', authenticate, roleRoutes);
app.use('/api/group-members', authenticate, memberRoutes);
app.use('/api/permissions', authenticate, permissionRoutes);

// 健康檢查 Endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'C Auth Service', port: config.port });
});

// 全域錯誤處理
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`=========================================`);
  console.log(`🚀 C 身分認證服務已啟動：http://localhost:${config.port}`);
  console.log(`🔗 目標 B 資料庫服務：${config.bServiceUrl}`);
  console.log(`🌐 允許 A 前端網址：${config.frontendUrl}`);
  console.log(`=========================================`);
});