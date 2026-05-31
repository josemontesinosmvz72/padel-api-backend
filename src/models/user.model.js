const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    username: { 
        type: String, 
        required: [true, 'El nombre de usuario es obligatorio'],
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, 'El correo es obligatorio'], 
        unique: true,
        lowercase: true,
        trim: true 
    },
    password: { 
        type: String, 
        required: [true, 'La contraseña es obligatoria'] 
    },
    avatar: { 
        type: String, 
        default: 'assets/avatars/av01.png'
    },
    role: { 
        type: String, 
        required: true, 
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: { 
        type: Boolean, 
        default: true
    },
    google: { 
        type: Boolean, 
        default: false 
    }
}, { 
    timestamps: true,
    versionKey: false 
});

usuarioSchema.methods.toJSON = function() {
    const { password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuariosAPI');