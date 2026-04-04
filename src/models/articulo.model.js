const mongoose = require('mongoose');
const {Schema} = mongoose;

const articuloSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: {
        type: String,
        required: true,
        enum: ['palas', 'ropa', 'calzado', 'mochilas', 'accesorios']
    },
    subcategoria: { type: String },
    marca: { type: String, required: true },
    fechaLanzamiento: { type: Date },
    precioRebajado: { type: Number, required: true },
    precio: {type: Number, required: true},
    
    talla: { type: String },
    color: { type: String },
    peso: { type: String },
    stock: { type: Number, default: 0 },

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Articulo', articuloSchema, 'articulosAPI');