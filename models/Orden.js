const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
    destino: { type: String, required: [true, 'Destino es obligatorio']},
    contenido: { type: String, required: [true, 'Contenido es obligatorio']},
    fecha_creacion: { type: Date, default: Date.now},
    estado: { type: String, required: [true, 'Estado es obligatorio'], enum: ['Pendiente', 'En tránsito', 'Entregado']},
    repartidor: { type: String, default: null },
    categoria: { type: String, required: [true, "Categoría obligatoria"], enum: ['Documentos','Tecnología','Ropa y accesorios','Hogar y decoración','Alimentos y bebidas','Salud y belleza','Otros'] },
    peso: { type: Number, required: [true, 'Peso(kg) es obligatorio'], min: [0] }
});

module.exports = mongoose.model('Orden', ordenSchema);