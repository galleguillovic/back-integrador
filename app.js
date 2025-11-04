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
  return res.json({ 
    ok: true, 
    state: mongoose.connection.readyState, 
    description: states[mongoose.connection.readyState] 
  });
});

app.get('/pingdb', (req, res) => {
  return res.json({ ok: true, readyState: mongoose.connection.readyState });
});

app.use('/ordenes', ordenesRoutes);

// Conexión a la base de datos
dbconnect()
  .then(() => console.log('✅ DB conectada correctamente'))
  .catch(err => console.error('❌ Error al conectar DB:', err.message));

// Iniciar servidor solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}

module.exports = app;