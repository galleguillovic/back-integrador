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

let cached = globalThis._mongoose || (globalThis._mongoose = { conn: null, promise: null });

function attachConnectionListeners(conn) {
  if (!conn || conn._listenersAttached) return;
  conn._listenersAttached = true;

  conn.on('connecting', () => console.log('🟡 mongoose event: connecting'));
  conn.on('connected', () => console.log('🟢 mongoose event: connected'));
  conn.on('disconnecting', () => console.log('🟠 mongoose event: disconnecting'));
  conn.on('disconnected', () => console.log('🔴 mongoose event: disconnected'));
  conn.on('reconnected', () => console.log('🔵 mongoose event: reconnected'));
  conn.on('error', (err) => console.error('❌ mongoose event: error', err && err.message ? err.message : err));
}

async function dbconnect() {
  // If there's already a connected cached connection, return it
  if (cached.conn && cached.conn.readyState === 1) {
    return cached.conn;
  }

  // If a connection promise is in-flight, await it
  if (!cached.promise) {
    console.log('🔌 creando nueva promesa de conexión a MongoDB...');
    cached.promise = mongoose.connect(MONGO_URI, options)
      .then((mongooseInst) => {
        const conn = mongooseInst.connection;
        attachConnectionListeners(conn);
        cached.conn = conn;
        console.log('✅ mongoose.connect resolved, readyState=', conn.readyState);
        return conn;
      })
      .catch(err => {
        cached.promise = null;
        console.error('❌ Error en mongoose.connect (raw):', err);
        throw err;
      });
  } else {
    console.log('⏳ esperando promesa de conexión existente...');
  }

  const conn = await cached.promise;
  return conn;
}

module.exports = dbconnect;