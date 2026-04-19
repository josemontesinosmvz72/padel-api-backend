const express = require('express');
const router = express.Router();
const articuloController = require('../controllers/articulo.controller');
const { route } = require("express/lib/application");
const { validarJWT } = require('../middleware-auth/validation.jwt');

router.get('/all', articuloController.getAllArticulos);
router.get('/paged', articuloController.getAllArticulos);
router.get('/detail/:id', articuloController.getArticuloPorId);
router.get('/categoria/:categoria', articuloController.getArticulosPorCategoria);
router.get('/subcategoria/:subcategoria', articuloController.getArticulosPorSubcategoria);

router.post('/addOne', validarJWT, articuloController.addArticulo);
router.patch('/updateOne/:id', validarJWT, articuloController.patchArticulo);
router.delete('/deleteOne/:id', validarJWT, articuloController.deleteArticulo);

module.exports = router;