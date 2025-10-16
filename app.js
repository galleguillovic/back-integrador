const express = require('express');
const dbconnect = require('./config/db');
const ordenesRoutes = require('./routes/ordenes');

const app = express();
app.use(express.json());
app.use('/ordenes', ordenesRoutes);

dbconnect().then(() => {
    app.listen(3000, () => console.log("Corriendo en http://localhost:3000"));
});