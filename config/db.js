require('dotenv').config();
const mongoose = require('mongoose');

const dbconnect = async () => {
  const uri = process.env.MONGO_URI;
  console.log('DEBUG: MONGO_URI presente?', !!uri);
  if (!uri) {
    console.error('❌ MONGO_URI no definido');
    throw new Error('MONGO_URI no definido');
  }

  // Mostrar un fragmento en logs (mascarado) para debugging sin exponer credenciales
  try {
    const masked = typeof uri === 'string' ? ('***' + uri.slice(-20)) : 'undefined';
    console.log('🔍 URI desde runtime (masked):', masked);
  } catch (_) {}

  try {
    console.log('🔌 Intentando conectar a MongoDB Atlas (serverSelectionTimeoutMS=30000)...');
    await mongoose.connect(uri, {
      // Opciones modernas; los warnings sobre useNewUrlParser/useUnifiedTopology son informativos
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Conectado a MongoDB Atlas. readyState=', mongoose.connection.readyState);
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB Atlas:', err && err.message ? err.message : err);
    console.error(err && err.stack ? err.stack : err);
    throw err;
  }
};

module.exports = dbconnect;