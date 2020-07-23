import mongoose from 'mongoose'
const { Schema } = mongoose

export default mongoose.model('user', new Schema({
    rol: { type: String, maxlength: 30, required: true },
    nombre: { type: String, maxlength: 50, unique: true, required: true },
    direccion: { type: String, maxlength: 70 },
    telefono: { type: String, maxlength: 20 },
    email: { type: String, maxlength: 50, unique: true, required: true },
    password: { type: String, maxlength: 64, required: true },
    favoritos: Array,
    carrito: {
        cart: Array,
        total: Number,
        in_cart: Number,
    },
    compras: Array,
    createdAt: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now }
}))