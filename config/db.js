require('dotenv').config();
const mongoose = require('mongoose');

const dbconnect = async () => {
  try {
    console.log("🔌 Conectando a MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    console.log("✅ Conexión exitosa a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB Atlas:", error.message);
  }
};

module.exports = dbconnect;