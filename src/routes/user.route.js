const { Router } = require('express');
const { login, register, renewToken } = require('../controllers/auth.controller');
const { validarJWT } = require('../middleware-auth/validation.jwt');

const router = Router();

router.post('/login', login);
router.post('/register', register);

router.get('/user-info', validarJWT, renewToken); 

module.exports = router;