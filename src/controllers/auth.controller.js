const Usuario = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {};

authController.register = async (req, res) => {
    try {
        const { email, password, username, avatar } = req.body;

        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                status: false,
                message: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = jwt.sign({ uid: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: '4h'
        });

        res.status(201).json({
            status: true,
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error al registrar usuario'
        });
    }
};

authController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                status: false,
                message: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                status: false,
                message: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign({ uid: usuarioDB._id }, process.env.JWT_SECRET, {
            expiresIn: '4h'
        });

        res.status(200).json({
            status: true,
            usuario: usuarioDB,
            token
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Hable con el administrador'
        });
    }
};

authController.renewToken = async (req, res) => {
    const uid = req.uid;

    const usuario = await Usuario.findById(uid);
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '4h' });

    res.json({
        status: true,
        usuario,
        token
    });
};

module.exports = authController;