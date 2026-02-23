const express = require('express');
const router = express.Router();
const articuloController = require('../controllers/articulo.controller');
const { route } = require("express/lib/application");

router.get('/', articuloController.getAllArticulos);
router.get('/categoria/:categoria', articuloController.getArticulosPorCategoria);
router.get('/subcategoria/:subcategoria', articuloController.getArticulosPorSubcategoria);
router.get('/:id', articuloController.getArticuloPorId);
router.post('/', articuloController.addArticulo);
router.put('/:id', articuloController.putArticulo);
router.patch('/:id', articuloController.patchArticulo);
router.delete('/:id', articuloController.deleteArticulo);

module.exports = router;