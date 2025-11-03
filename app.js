// app.js (fragmento completo si querés reemplazar)
const express = require('express');
const cors = require('cors');
const dbconnect = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://logisticafront-integrador.vercel.app', 'https://your-frontend-domain.vercel.app'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','Accept','Origin','X-Requested-With'],
  credentials: false
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.get('/', (req, res) => res.send('API de gestión de órdenes funcionando correctamente 🚚'));
app.use('/ordenes', ordenesRoutes);

dbconnect().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
});