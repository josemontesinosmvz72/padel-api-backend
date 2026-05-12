const mongoose = require('mongoose');
const { Schema } = mongoose;

const pistaSchema = new Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, enum: ['indoor', 'outdoor'], default: 'outdoor' },
    estado: { type: String, enum: ['libre', 'reservada', 'mantenimiento'], default: 'libre' }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Pista', pistaSchema, 'pistasAPI');