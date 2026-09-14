/**
 * License: NPL-KK
 * File: middleware/errorHandler.js
 */
// Bug fix: blueprint asli tidak punya 404 handler / global error handler
const notFound = (req, res, next) => {
  res.status(404).json({ error: `Route tidak ditemukan: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    error: err.message || 'Terjadi kesalahan pada server'
  });
};

module.exports = { notFound, errorHandler };

/**
 * License: NPL-KK
 */
