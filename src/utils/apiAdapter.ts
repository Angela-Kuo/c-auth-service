import { config } from '../config/env';

export interface CallBServiceOptions {
  method: string;
  endpoint: string;
  data?: any;
  currentUid?: number | string | null;
  userId?: number | string | null; // 支援 userId
}

export interface ApiAdapterResult {
  success: boolean;
  status: number;
  data?: any;
  error?: string;
}

export async function callBService({
  method,
  endpoint,
  data = null,
  currentUid = null,
  userId = null, // 👈 1. 補上解構 userId
}: CallBServiceOptions): Promise<ApiAdapterResult> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // 👈 2. 判斷使用 userId 或 currentUid
  const activeUid = userId ?? currentUid;

  if (activeUid !== null && activeUid !== undefined) {
    headers['x-user-id'] = String(activeUid);
  }

  const options: RequestInit = {
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