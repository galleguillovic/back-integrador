require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbconnect = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');

const app = express();
app.use(express.json());

// ALLOWED_ORIGINS configurable por env var: "https://prod.front.com,http://localhost:5173"
const allowedFromEnv = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = allowedFromEnv
  ? allowedFromEnv.split(',').map(s => s.trim()).filter(Boolean)
  : (process.env.NODE_ENV === 'production' ? [] : ['http://localhost:5173']);

// CORS seguro: permite requests sin origin (p. ej. curl / server-to-server)
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: origin not allowed'), false);
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
}));

// Ruta simple de comprobación
app.get('/', (req, res) => res.send('🚚 API de gestión de órdenes funcionando correctamente'));

// Ruta de diagnóstico para verificar el estado de la conexión a Mongo
app.get('/pingdb', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    // readyState: 0 disconnected, 1 connected, 2 connecting, 3 disconnecting
    return res.json({ ok: true, readyState: mongoose.connection.readyState });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || 'unknown' });
  }
});

// Rutas principales
app.use('/ordenes', ordenesRoutes);

// Conectar a la DB en la inicialización del módulo (cold-start friendly)
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

// Export para Vercel / serverless
module.exports = app;