const express = require('express');
const router = express.Router();
const cors = require('cors');
const Orden = require('../models/Orden');

router.use(cors({ origin: ['http://localhost:5173', 'https://logisticafront-integrador.vercel.app', '*' ] }));

// Ordenar las ordenes por estado 
router.get('/', async (req, res) => {
    try {
        const { estado } = req.query;
        const filtro = estado ? { estado } : {};
        const ordenes = await Orden.find(filtro);
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Obtener un orden por ID
router.get('/:id', async (req, res) => {
    try {
        const orden = await Orden.findById(req.params.id);
        if (!orden) return res.status(404).json({ mensaje: 'Orden no encontrada' });
        res.json(orden);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Crear nueva orden
router.post('/', async (req, res) => {
    try {
        const nuevaOrden = new Orden(req.body);
        await nuevaOrden.save(); // se valida el enum en el modelo
        res.status(201).json(nuevaOrden);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Actualizar una orden existente
router.put('/:id', async (req, res) => {
    try {
        const ordenActualizada = await Orden.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!ordenActualizada)
            return res.status(404).json({ mensaje: 'Orden no encontrada' });
        res.json(ordenActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Eliminar una orden
router.delete('/:id', async (req, res) => {
    try {
        const ordenEliminada = await Orden.findByIdAndDelete(req.params.id);
        if (!ordenEliminada)
            return res.status(404).json({ mensaje: 'Orden no encontrada' });
        res.json({ mensaje: 'Orden eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Mostrar cantidad de órdenes por estado
router.get('/estadisticas/estados', async (req, res) => {
    try {
        const resultados = await Orden.aggregate([
            {$group: {_id: "$estado", cantidad: { $sum: 1 }}},
            {$project: {_id: 0, estado: "$_id", cantidad: 1}}
        ]);
        res.json(resultados);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router;
