const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
    destino: { type: String, required: [true, 'El destino es obligatorio']},
    contenido: { type: String, required: [true, 'El contenido es obligatorio']},
    fecha_creacion: { type: Date, default: Date.now},
    estado: { type: String, required: [true, 'El estado es obligatorio'], enum: ['Pendiente', 'En tránsito', 'Entregado']}
});

module.exports = mongoose.model('Orden', ordenSchema);