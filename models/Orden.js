const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
    destino: { type: String, required: [true, 'El destino es obligatorio']},
    contenido: { type: String, required: [true, 'El contenido es obligatorio']},
    categoria: { type: String, required: [true, 'La categoria es obligatoria']},
    fecha_creacion: { type: Date, default: Date.now},
    estado: { type: String, required: [true, 'El estado es obligatorio'], enum: ['Pendiente', 'En tránsito', 'Entregado']},
    repartidor: { type: String, default: null },
    peso: { type: Number, required: [true, 'El peso es obligatorio'], min: [0, 'El peso debe ser un número mayor o igual a 0 (kg)'] }
});

module.exports = mongoose.model('Orden', ordenSchema);