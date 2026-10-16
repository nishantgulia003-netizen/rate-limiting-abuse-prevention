const rateLimit = require('express-rate-limit');

// In multi-instance deployments, replace the default in-memory store with a
// rate-limit-redis RedisStore so every server shares one counter. MemoryStore
// is per process, so a load balancer would otherwise multiply the allowed limit.
module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    res.set('Retry-After', '900');
    res.status(429).json({ error: 'Too many requests, please try again later.' });
  },
});
