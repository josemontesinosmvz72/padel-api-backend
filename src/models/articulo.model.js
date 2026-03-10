const mongoose = require('mongoose');
const {Schema} = mongoose;

const articuloSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    imagen: { type: String, required: true }, // URL de la imagen
    descripcion: { type: String, required: true },
    categoria: {
        type: String,
        required: true,
        enum: ['palas', 'ropa', 'calzado', 'mochilas', 'accesorios']
    },
    subcategoria: { type: String }, // ej: 'camisetas', 'pantalones', 'grips'
    marca: { type: String, required: true },
    precioRebajado: { type: Number, required: true },
    precio: {type: Number, required: true},

    // Campos opcionales según la categoría
    talla: { type: String }, // Para ropa y calzado
    color: { type: String },
    peso: { type: String }, // Para palas
    stock: { type: Number, default: 0 },

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Articulo', articuloSchema, 'articulosAPI');