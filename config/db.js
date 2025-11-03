require('dotenv').config();
const mongoose = require('mongoose');

const dbconnect = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGO_URI no está definido');
    throw new Error('MONGO_URI no definido');
  }

  try {
    console.log('🔌 Intentando conectar a MongoDB Atlas...');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    throw err;
  }
};

module.exports = dbconnect;