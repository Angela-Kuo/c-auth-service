import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('[System Error]', err);
  res.status(err.status || 500).json({
    error: err.message || '伺服器內部錯誤',
  });
}