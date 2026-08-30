import express from 'express';

const app = express();
app.use(express.json());

// 1. 模擬註冊 API (POST /api/users)
app.post('/api/users', (req, res) => {
  const { username, describe } = req.body;
  console.log('【假 B 服務】收到註冊請求：', username);
  return res.status(201).json({
    uid: 99,
    username,
    describe: describe || '測試使用者'
  });
});

// 2. 模擬驗證帳密 API (POST /api/users/verify)
app.post('/api/users/verify', (req, res) => {
  const { username, pwd } = req.body;
  console.log('【假 B 服務】收到登入驗證請求：', username);

  if (username === 'admin' && pwd === 'admin123') {
    return res.json({ uid: 1, username: 'admin', describe: '系統管理員' });
  }
  if (username === 'user01' && pwd === 'user123') {
    return res.json({ uid: 99, username: 'user01', describe: '一般測試號' });
  }

  return res.status(401).json({ error: '帳號或密碼錯誤' });
});

// 3. 模擬查詢 Operations 權限 API (GET /api/users/:uid/operations)
app.get('/api/users/:uid/operations', (req, res) => {
  const uid = req.params.uid;
  console.log(`【假 B 服務】收到查詢 uid=${uid} 的 Operations 請求`);

  // 如果是 admin (uid=1)，給滿 13 個權限
  if (uid === '1') {
    return res.json({
      uid: 1,
      roles: [1],
      operations: [
        { resource: 'User', action: 'create' },
        { resource: 'User', action: 'update' },
        { resource: 'User', action: 'delete' },
        { resource: 'Group', action: 'create' },
        { resource: 'Group', action: 'update' },
        { resource: 'Group', action: 'delete' },
        { resource: 'Role', action: 'create' },
        { resource: 'Role', action: 'update' },
        { resource: 'Role', action: 'delete' },
        { resource: 'GroupMember', action: 'create' },
        { resource: 'GroupMember', action: 'delete' },
        { resource: 'Permission', action: 'create' },
        { resource: 'Permission', action: 'delete' }
      ]
    });
  }

  // 普通使用者給空的 operations
  return res.json({ uid: Number(uid), roles: [], operations: [] });
});

// 4. 模擬管理性 API：檢查 x-user-id Header (POST /api/groups)
app.post('/api/groups', (req, res) => {
  const userId = req.headers['x-user-id'];
  console.log('【假 B 服務】收到建立群組請求，x-user-id Header 為：', userId);

  if (!userId) {
    return res.status(401).json({ error: '401 Unauthorized: 請求未附帶 x-user-id' });
  }

  // 只允許 admin (uid=1) 操作
  if (userId === '1') {
    return res.json({ message: '群組建立成功 (假 B 服務回覆)', group: req.body });
  }

  // 其他人回傳 403
  return res.status(403).json({ error: '403 Forbidden: 你沒有權限執行此操作' });
});

app.listen(3001, () => {
  console.log('=========================================');
  console.log('🤖 假 B 資料庫服務已啟動：http://localhost:3001');
  console.log('=========================================');
});