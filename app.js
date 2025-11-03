const express = require('express');
const cors = require('cors');
const dbconnect = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');

const app = express();

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['https://logisticafront-integrador.vercel.app']
    : ['http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);


app.use(express.json());
app.get('/', (req, res) => {
  res.send('🚚 API funcionando correctamente');
});

app.use('/ordenes', ordenesRoutes);


if (process.env.NODE_ENV !== 'production') {
  dbconnect().then(() => {
    app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
  });
}


module.exports = app;