require('dotenv').config();
const mongoose = require('mongoose');

const dbconnect = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGO_URI no está definido en las variables de entorno.');
    throw new Error('MONGO_URI no definido');
  }

  console.log('🔎 MONGO_URI presente? ', !!process.env.MONGO_URI);

  try {
    console.log('🔌 Intentando conectar a MongoDB Atlas (serverSelectionTimeoutMS=30000)...');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, 
      socketTimeoutMS: 45000,
    });
    console.log('✅ Conexión exitosa a MongoDB Atlas. readyState =', mongoose.connection.readyState);
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB Atlas:', err && err.message ? err.message : err);
    console.error('Full error (stack):', err && err.stack ? err.stack : err);
    process.exitCode = 1;
    throw err;
  }
};

module.exports = dbconnect;