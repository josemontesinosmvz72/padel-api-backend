const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');
const { validarJWT } = require('../middleware-auth/validation.jwt');

router.get('/pistas',                 reservaController.getPistas);
router.post('/reservar/:idPista',     validarJWT, reservaController.crearReserva);
router.patch('/cancelar/:idReserva',  validarJWT, reservaController.cancelarReserva);
router.get('/mis-reservas',           validarJWT, reservaController.getMisReservas);

module.exports = router;