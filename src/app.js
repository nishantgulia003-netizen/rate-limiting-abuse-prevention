const express = require('express');
const authLimiter = require('./middleware/rateLimiter');
const { users } = require('./data');

const app = express();
app.use(express.json());

app.post('/auth/login', authLimiter, (req, res) => {
  const user = users.find((entry) => entry.email === req.body.email && entry.password === req.body.password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  return res.status(200).json({ token: 'demo-token' });
});
app.post('/auth/register', authLimiter, (req, res) => res.status(201).json({ ok: true }));
app.post('/auth/refresh', authLimiter, (req, res) => res.status(200).json({ token: 'demo-token' }));
app.get('/health', (req, res) => res.status(200).json({ ok: true }));

module.exports = app;
