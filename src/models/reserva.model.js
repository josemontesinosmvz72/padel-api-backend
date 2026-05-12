const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservaSchema = new Schema({
    pista:   { type: Schema.Types.ObjectId, ref: 'Pista', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fecha:   { type: Date, required: true },
    horaInicio: { type: String, required: true },
    horaFin:    { type: String, required: true },
    estado: { type: String, enum: ['activa', 'cancelada'], default: 'activa' }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Reserva', reservaSchema, 'reservasAPI');