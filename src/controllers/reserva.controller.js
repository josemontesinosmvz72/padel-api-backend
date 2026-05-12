const Pista = require('../models/pistas.model');
const Reserva = require('../models/reserva.model');

const reservaController = {};


reservaController.getPistas = async (req, res) => {
    try {
        const pistas = await Pista.find();
        res.status(200).json({ status: true, pistas });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};

reservaController.crearReserva = async (req, res) => {
    try {
        const pista = await Pista.findById(req.params.idPista);

        if (!pista) {
            return res.status(404).json({ status: false, message: 'Pista no encontrada' });
        }

        if (pista.estado !== 'libre') {
            return res.status(400).json({ status: false, message: 'La pista no está disponible' });
        }

        const reserva = new Reserva({
            pista: req.params.idPista,
            usuario: req.uid,
            fecha: req.body.fecha,
            horaInicio: req.body.horaInicio,
            horaFin: req.body.horaFin
        });

        await reserva.save();
        await Pista.findByIdAndUpdate(req.params.idPista, { estado: 'reservada' });

        res.status(201).json({ status: true, message: 'Pista reservada correctamente', reserva });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};

reservaController.cancelarReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.idReserva);

        if (!reserva) {
            return res.status(404).json({ status: false, message: 'Reserva no encontrada' });
        }

        if (reserva.estado === 'cancelada') {
            return res.status(400).json({ status: false, message: 'La reserva ya estaba cancelada' });
        }

        await Reserva.findByIdAndUpdate(req.params.idReserva, { estado: 'cancelada' });
        await Pista.findByIdAndUpdate(reserva.pista, { estado: 'libre' });

        res.status(200).json({ status: true, message: 'Reserva cancelada correctamente' });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};

reservaController.getMisReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find({ usuario: req.uid }).populate('pista', 'nombre tipo');
        res.status(200).json({ status: true, reservas });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};

module.exports = reservaController;