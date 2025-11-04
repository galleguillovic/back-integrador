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
  // reconecta si no hay conexión
  if (!cached.conn || cached.conn.readyState === 0) {
    console.log('🔌 intentando conectar a MongoDB...');
    cached.promise = mongoose.connect(MONGO_URI, options)
      .then((mongooseInst) => {
        cached.conn = mongooseInst.connection;
        console.log('✅ Conexión MongoDB establecida, readyState=', cached.conn.readyState);
        return cached.conn;
      })
      .catch(err => {
        cached.promise = null;
        console.error('❌ Error MongoDB:', err && err.message ? err.message : err);
        throw err;
      });
    await cached.promise;
  }
  return cached.conn;
}

module.exports = dbconnect;