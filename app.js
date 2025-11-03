const express = require('express');
const cors = require('cors');
const dbconnect = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');
require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://logisticafront-integrador.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false, // true para auth con cookies
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚚'); 
});

app.use('/ordenes', ordenesRoutes);

dbconnect().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
});