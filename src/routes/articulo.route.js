const express = require('express');
const router = express.Router();
const articuloController = require('../controllers/articulo.controller');
const { route } = require("express/lib/application");

router.get('/all', articuloController.getAllArticulos);
router.get('/paged', articuloController.getAllArticulos);
router.get('/detail/:id', articuloController.getArticuloPorId);
router.get('/categoria/:categoria', articuloController.getArticulosPorCategoria);
router.post('/addOne', articuloController.addArticulo);
router.patch('/updateOne/:id', articuloController.patchArticulo);
router.delete('/deleteOne/:id', articuloController.deleteArticulo);

module.exports = router;