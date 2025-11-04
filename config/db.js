require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI no definido');
  throw new Error('MONGO_URI no definido');
}

const options = {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
};

let cached = globalThis._mongoose;
if (!cached) {
  cached = globalThis._mongoose = { conn: null, promise: null };
}

async function dbconnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log('🔌 creando nueva promesa de conexión a MongoDB...');
    cached.promise = mongoose.connect(MONGO_URI, options).then((mongooseInst) => {
      return mongooseInst.connection;
    });
  }

  try {
    const conn = await cached.promise;
    cached.conn = conn;
    console.log('✅ Conexión a MongoDB lista. readyState=', conn.readyState);
    return conn;
  } catch (err) {
    cached.promise = null;
    console.error('❌ Error en conexión a MongoDB (dbconnect):', err && err.message ? err.message : err);
    throw err;
  }
}

module.exports = dbconnect;