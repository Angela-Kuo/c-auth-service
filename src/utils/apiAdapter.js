import { config } from '../config/env.js';

export async function callBService({ method, endpoint, data = null, currentUid = null }) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (currentUid !== null && currentUid !== undefined) {
    headers['x-user-id'] = String(currentUid); // 轉發操作者的 uid 給 B[cite: 2]
  }

  const options = {
    method,
    headers,
  };

  if (data && ['POST', 'PATCH', 'PUT'].includes(method.toUpperCase())) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${config.bServiceUrl}${endpoint}`, options);
    const result = await response.json().catch(() => ({}));

    if (response.ok) {
      return { success: true, status: response.status, data: result };
    } else {
      return {
        success: false,
        status: response.status,
        error: result.error || 'B 服務處理失敗',
      };
    }
  } catch (error) {
    return {
      success: false,
      status: 500,
      error: '無法連線至 B 資料庫服務 (PORT 3001)',
    };
  }
}