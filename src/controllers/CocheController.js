const express = require('express');
const router = express.Router();
const cocheService = require('../services/CocheService');

// Modificion de la salida de la pagina visualmente
router.use((req, res, next) => {
  req.app.set('json spaces', 2);
  next();
});

// GET /coches - Listar coches filtrados por marca
router.get('/', async (req, res) => {
  try {
    const marca = req.query.marca;
    const lista = await cocheService.consultarCochesPorMarca(marca);
    res.json(lista);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// POST /coches - Registrar un nuevo coche
router.post('/', async (req, res) => {
  try {
    const nuevoCoche = await cocheService.crearNuevoCoche(req.body);
    res.status(201).json(nuevoCoche);
  } catch (err) {
    if (err.status === 400) {
      return res.status(400).send(err.message);
    }
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
