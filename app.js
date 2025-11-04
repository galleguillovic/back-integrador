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
app.get('/vercel-test', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({ ok: true, state: mongoose.connection.readyState, description: states[mongoose.connection.readyState] });
});
app.get('/pingdb', async (req, res) => {
  res.json({ ok: true, readyState: mongoose.connection.readyState });
});


app.use('/ordenes', async (req, res, next) => {
  try {
    await dbconnect();
    next();
  } catch (err) {
    return res.status(500).json({ mensaje: 'No se pudo conectar a DB', error: err?.message || 'unknown' });
  }
}, ordenesRoutes);

module.exports = app;