require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbconnect = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');
const corsOptions = require('./config/corsOptions');

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.get('/', (req, res) => res.send('🚚 API funcionando correctamente'));

// Endpoint que intenta conectar si no hay conexión
app.get('/vercel-test', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await dbconnect();
    }
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    return res.json({ ok: true, state: mongoose.connection.readyState, description: states[mongoose.connection.readyState] });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || 'unknown' });
  }
});

app.get('/pingdb', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await dbconnect();
    }
    return res.json({ ok: true, readyState: mongoose.connection.readyState });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || 'unknown' });
  }
});

app.use('/ordenes', async (req, res, next) => {
  try {
    await dbconnect();
    return next();
  } catch (err) {
    console.error('🔴 Error conectando DB desde middleware /ordenes:', err && err.message ? err.message : err);
    return res.status(503).json({ mensaje: 'No se pudo conectar a la base de datos', error: err?.message || 'unknown' });
  }
}, ordenesRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}

module.exports = app;