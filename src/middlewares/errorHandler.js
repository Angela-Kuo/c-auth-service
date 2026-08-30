export function errorHandler(err, req, res, next) {
  console.error('[System Error]', err);
  res.status(err.status || 500).json({
    error: err.message || '伺服器內部錯誤',
  });
}