require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const dbconnect = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');

const app = express();
app.use(express.json());

const allowedFromEnv = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = allowedFromEnv
  ? allowedFromEnv.split(',').map(s => s.trim()).filter(Boolean)
  : (process.env.NODE_ENV === 'production' ? [] : ['http://localhost:5173']);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: origin not allowed'), false);
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
}));

app.get('/', (req, res) => res.send('🚚 API de gestión de órdenes funcionando correctamente'));

// /estado de conexión con mongoose
app.get('/vercel-test', async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    return res.json({ ok: true, state, description: states[state] || 'unknown' });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || 'unknown' });
  }
});


app.get('/pingdb', async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    return res.json({ ok: true, readyState: state });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || 'unknown' });
  }
});

app.use('/ordenes', ordenesRoutes);

dbconnect()
  .then(() => {
    console.log('DB connect resolved (module init).');
    if (process.env.NODE_ENV !== 'production') {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
    }
  })
  .catch(err => {
    console.error('Fallo al conectar DB en module init:', err && err.message ? err.message : err);
  });

module.exports = app;